import { z } from 'zod';
declare const scheme: z.ZodObject<{
    dns: z.ZodString;
}, "strip", z.ZodTypeAny, {
    dns?: string;
}, {
    dns?: string;
}>;
export type SentryConfig = Required<z.infer<typeof scheme>>;
export declare const sentryConfig: (() => SentryConfig) & import("@nestjs/config").ConfigFactoryKeyHost<Required<{
    dns?: string;
}>>;
export {};
