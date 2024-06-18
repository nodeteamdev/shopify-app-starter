import { readFile } from 'node:fs/promises';
import * as path from 'node:path';
import { AppConfig } from '@config/app.config';
import { MailerConfig } from '@config/mailer.config';
import { SendEmailData } from '@modules/email/interfaces/send-email-data.interface';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Handlebars from 'handlebars';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
const nodemailerSendgrid = require('nodemailer-sendgrid');

@Injectable()
export class EmailService {
  private readonly mailTransport!: Mail;

  private readonly logger: Logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {
    const mailerConfig: MailerConfig =
      this.configService.get<MailerConfig>('mailer');

    this.mailTransport = createTransport(
      nodemailerSendgrid({
        apiKey: mailerConfig.user.password,
        host: mailerConfig.host,
        port: mailerConfig.port,
      }),
      {
        secure: mailerConfig.secure,
        requireTLS: true,
        tls: {
          ciphers: 'SSLv3',
          rejectUnauthorized: false,
        },
      },
    );

    this.logger.log('Mail transport created');
  }

  public sendResetPasswordEmail(email: string, token: string): Promise<void> {
    const appConfig: AppConfig = this.configService.get<AppConfig>('app');

    const callbackUrl = `https://${appConfig.host}/reset-password`;

    return this.sendEmail({
      email,
      templateFileName: 'reset-password.html',
      subject: 'Password Reset',
      templateData: { callbackUrl, token },
    });
  }

  public sendEmailVerificationEmail(
    email: string,
    token: string,
  ): Promise<void> {
    const appConfig: AppConfig = this.configService.get<AppConfig>('app');

    const callbackUrl = `https://${appConfig.host}/verify-email`;

    return this.sendEmail({
      email,
      templateFileName: 'verify-email.html',
      subject: 'Email Verification',
      templateData: { callbackUrl, token },
    });
  }

  public sendCustomerDataRequest(data: string): Promise<void> {
    return this.sendCustomerData(
      data,
      'customer-data-request.html',
      'Customer data request',
    );
  }

  public sendCustomerRedactDataRequest(data: string): Promise<void> {
    return this.sendCustomerData(
      data,
      'customer-redact.html',
      'Customer redact data request',
    );
  }

  private async sendCustomerData(
    data: string,
    pathName: string,
    subject: string,
  ): Promise<void> {
    const appConfig = this.configService.get('app');
    const logo = appConfig.logoUrl;

    const htmlTemplate = await readFile(
      path.join(__dirname, './templates', pathName),
      {
        encoding: 'utf8',
      },
    );
    const compiledTemplate = Handlebars.compile(htmlTemplate);

    try {
      const renderedHtml = compiledTemplate({
        logo,
        data,
      });

      await this.mailTransport.sendMail({
        to: appConfig.adminEmail,
        from: appConfig.emailFrom,
        subject,
        html: renderedHtml,
      });
    } catch (e) {
      Logger.error(e);
    }
  }

  private async sendEmail({
    email,
    templateFileName,
    subject,
    templateData,
  }: SendEmailData): Promise<void> {
    const mailerConfig: MailerConfig =
      this.configService.get<MailerConfig>('mailer');

    const htmlTemplate: string = await this.getHtmlTemplate(templateFileName);

    const compiledTemplate = Handlebars.compile(htmlTemplate);
    const renderedHtml: string = compiledTemplate({ ...templateData });

    try {
      await this.mailTransport.sendMail({
        to: email,
        from: `Shopify App Starter <${mailerConfig.user.email}>`,
        subject,
        html: renderedHtml,
        attachments: [],
      });
    } catch (error) {
      this.logger.error('Email sending failed');
      this.logger.error({
        email,
        templateFileName,
        subject,
        templateData,
      });
      this.logger.error(error);

      throw error;
    }
  }

  private async getHtmlTemplate(
    templateFileName: `${string}.html`,
  ): Promise<string> {
    try {
      return await readFile(
        path.join(__dirname, './templates', templateFileName),
        { encoding: 'utf8' },
      );
    } catch (error) {
      this.logger.error('HTML template file reading failed');
      this.logger.error({ templateFileName });
      this.logger.error(error);

      throw error;
    }
  }
}
