"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const promises_1 = require("node:fs/promises");
const path = __importStar(require("node:path"));
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Handlebars = __importStar(require("handlebars"));
const nodemailer_1 = require("nodemailer");
const nodemailerSendgrid = require('nodemailer-sendgrid');
let EmailService = EmailService_1 = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(EmailService_1.name);
        const mailerConfig = this.configService.get('mailer');
        this.mailTransport = (0, nodemailer_1.createTransport)(nodemailerSendgrid({
            apiKey: mailerConfig.user.password,
            host: mailerConfig.host,
            port: mailerConfig.port,
        }), {
            secure: mailerConfig.secure,
            requireTLS: true,
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false,
            },
        });
        this.logger.log('Mail transport created');
    }
    sendResetPasswordEmail(email, token) {
        const appConfig = this.configService.get('app');
        const callbackUrl = `https://${appConfig.host}/reset-password`;
        return this.sendEmail({
            email,
            templateFileName: 'reset-password.html',
            subject: 'Password Reset',
            templateData: { callbackUrl, token },
        });
    }
    sendEmailVerificationEmail(email, token) {
        const appConfig = this.configService.get('app');
        const callbackUrl = `https://${appConfig.host}/verify-email`;
        return this.sendEmail({
            email,
            templateFileName: 'verify-email.html',
            subject: 'Email Verification',
            templateData: { callbackUrl, token },
        });
    }
    sendCustomerDataRequest(data) {
        return this.sendCustomerData(data, 'customer-data-request.html', 'Customer data request');
    }
    sendCustomerRedactDataRequest(data) {
        return this.sendCustomerData(data, 'customer-redact.html', 'Customer redact data request');
    }
    async sendCustomerData(data, pathName, subject) {
        const mailerConfig = this.configService.get('mailer');
        const htmlTemplate = await (0, promises_1.readFile)(path.join(__dirname, './templates', pathName), {
            encoding: 'utf8',
        });
        const compiledTemplate = Handlebars.compile(htmlTemplate);
        try {
            const renderedHtml = compiledTemplate({
                data,
            });
            await this.mailTransport.sendMail({
                to: mailerConfig.adminEmail,
                from: mailerConfig.emailFrom,
                subject,
                html: renderedHtml,
            });
        }
        catch (e) {
            this.logger.error(e);
        }
    }
    async sendEmail({ email, templateFileName, subject, templateData, }) {
        const mailerConfig = this.configService.get('mailer');
        const htmlTemplate = await this.getHtmlTemplate(templateFileName);
        const compiledTemplate = Handlebars.compile(htmlTemplate);
        const renderedHtml = compiledTemplate({ ...templateData });
        try {
            await this.mailTransport.sendMail({
                to: email,
                from: `Shopify App Starter <${mailerConfig.user.email}>`,
                subject,
                html: renderedHtml,
                attachments: [],
            });
        }
        catch (error) {
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
    async getHtmlTemplate(templateFileName) {
        try {
            return await (0, promises_1.readFile)(path.join(__dirname, './templates', templateFileName), { encoding: 'utf8' });
        }
        catch (error) {
            this.logger.error('HTML template file reading failed');
            this.logger.error({ templateFileName });
            this.logger.error(error);
            throw error;
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map