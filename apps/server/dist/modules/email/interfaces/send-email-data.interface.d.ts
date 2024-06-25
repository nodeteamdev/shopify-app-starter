export interface SendEmailData {
    readonly email: string;
    readonly templateFileName: `${string}.html`;
    readonly subject: string;
    readonly templateData?: Record<string, string>;
}
