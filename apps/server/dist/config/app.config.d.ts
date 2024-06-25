import { z } from 'zod';
declare const scheme: z.ZodObject<{
    port: z.ZodNumber;
    loggerLevel: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"log">, z.ZodLiteral<"error">, z.ZodLiteral<"warn">, z.ZodLiteral<"debug">, z.ZodLiteral<"verbose">, z.ZodLiteral<"fatal">]>, "many">;
    nodeEnv: z.ZodString;
    clientHost: z.ZodString;
    version: z.ZodString;
    rateLimitTtl: z.ZodNumber;
    rateLimitTimes: z.ZodNumber;
    sentryDns: z.ZodString;
    host: z.ZodString;
}, "strip", z.ZodTypeAny, {
    port?: number;
    loggerLevel?: ("log" | "error" | "warn" | "debug" | "verbose" | "fatal")[];
    nodeEnv?: string;
    clientHost?: string;
    version?: string;
    rateLimitTtl?: number;
    rateLimitTimes?: number;
    sentryDns?: string;
    host?: string;
}, {
    port?: number;
    loggerLevel?: ("log" | "error" | "warn" | "debug" | "verbose" | "fatal")[];
    nodeEnv?: string;
    clientHost?: string;
    version?: string;
    rateLimitTtl?: number;
    rateLimitTimes?: number;
    sentryDns?: string;
    host?: string;
}>;
export type AppConfig = Required<z.infer<typeof scheme>>;
export declare const appConfig: (() => AppConfig) & import("@nestjs/config").ConfigFactoryKeyHost<Required<{
    port?: number;
    loggerLevel?: ("log" | "error" | "warn" | "debug" | "verbose" | "fatal")[];
    nodeEnv?: string;
    clientHost?: string;
    version?: string;
    rateLimitTtl?: number;
    rateLimitTimes?: number;
    sentryDns?: string;
    host?: string;
}>>;
export {};
