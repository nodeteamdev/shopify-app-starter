import { z } from 'zod';
declare const scheme: z.ZodObject<{
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url?: string;
}, {
    url?: string;
}>;
export type RedisConfig = Required<z.infer<typeof scheme>>;
export declare const redisConfig: (() => RedisConfig) & import("@nestjs/config").ConfigFactoryKeyHost<Required<{
    url?: string;
}>>;
export {};
