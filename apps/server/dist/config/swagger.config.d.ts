import { z } from 'zod';
declare const scheme: z.ZodObject<{
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password?: string;
}, {
    password?: string;
}>;
export type SwaggerConfig = Required<z.infer<typeof scheme>>;
export declare const swaggerConfig: (() => SwaggerConfig) & import("@nestjs/config").ConfigFactoryKeyHost<Required<{
    password?: string;
}>>;
export {};
