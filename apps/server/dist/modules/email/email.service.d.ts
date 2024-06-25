import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    private readonly mailTransport;
    private readonly logger;
    constructor(configService: ConfigService);
    sendResetPasswordEmail(email: string, token: string): Promise<void>;
    sendEmailVerificationEmail(email: string, token: string): Promise<void>;
    sendCustomerDataRequest(data: string): Promise<void>;
    sendCustomerRedactDataRequest(data: string): Promise<void>;
    private sendCustomerData;
    private sendEmail;
    private getHtmlTemplate;
}
