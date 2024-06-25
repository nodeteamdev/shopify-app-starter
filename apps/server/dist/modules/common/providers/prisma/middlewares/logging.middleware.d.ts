import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
export interface LoggingMiddlewareOptions {
    logger: Console | Logger;
    logLevel: 'log' | 'debug' | 'warn' | 'error';
    logMessage?: (query: QueryInfo) => string;
}
export interface QueryInfo {
    model: string;
    action: string;
    before: number;
    after: number;
    executionTime: number;
}
export declare function loggingMiddleware({ logger, logMessage, logLevel }?: LoggingMiddlewareOptions): Prisma.Middleware;
