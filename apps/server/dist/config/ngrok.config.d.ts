import { z } from 'zod';
declare const scheme: z.ZodObject<{
    domain: z.ZodString;
    authToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    domain?: string;
    authToken?: string;
}, {
    domain?: string;
    authToken?: string;
}>;
export type NgrokConfig = Required<z.infer<typeof scheme>>;
export declare const ngrokConfig: (() => NgrokConfig) & import("@nestjs/config").ConfigFactoryKeyHost<Required<{
    domain?: string;
    authToken?: string;
}>>;
export {};
