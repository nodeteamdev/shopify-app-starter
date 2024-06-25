import { TemplateAdapterConfig } from '../interfaces/template-adapter-config.interface';
import { TemplateAdapter } from '../interfaces/template-adapter.interface';
import { MailerOptions } from '../interfaces/mailer-options.interface';
export declare class MjmlAdapter implements TemplateAdapter {
    private engine;
    constructor(engine: TemplateAdapter | '' | 'pug' | 'handlebars' | 'ejs', config?: TemplateAdapterConfig, others?: {
        handlebar?: {
            helper?: any;
        };
    });
    compile(mail: any, callback: any, mailerOptions: MailerOptions): void;
}
