import { z } from 'zod';
declare const scheme: z.ZodObject<{
    host: z.ZodString;
    port: z.ZodNumber;
    secure: z.ZodBoolean;
    user: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        password?: string;
        email?: string;
    }, {
        password?: string;
        email?: string;
    }>;
    emailFrom: z.ZodString;
    adminEmail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    port?: number;
    host?: string;
    secure?: boolean;
    user?: {
        password?: string;
        email?: string;
    };
    emailFrom?: string;
    adminEmail?: string;
}, {
    port?: number;
    host?: string;
    secure?: boolean;
    user?: {
        password?: string;
        email?: string;
    };
    emailFrom?: string;
    adminEmail?: string;
}>;
export type MailerConfig = Required<z.infer<typeof scheme>>;
export declare const mailerConfig: (() => MailerConfig) & import("@nestjs/config").ConfigFactoryKeyHost<Required<{
    port?: number;
    host?: string;
    secure?: boolean;
    user?: {
        password?: string;
        email?: string;
    };
    emailFrom?: string;
    adminEmail?: string;
}>>;
export {};
