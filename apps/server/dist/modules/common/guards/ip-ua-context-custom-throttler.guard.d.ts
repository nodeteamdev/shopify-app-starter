import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModuleOptions, ThrottlerStorage } from '@nestjs/throttler';
export declare class IpUaContextThrottlerGuard extends ThrottlerGuard {
    readonly options: ThrottlerModuleOptions;
    readonly storageService: ThrottlerStorage;
    readonly reflector: Reflector;
    private readonly logger;
    constructor(options: ThrottlerModuleOptions, storageService: ThrottlerStorage, reflector: Reflector);
    handleRequest(context: ExecutionContext, limit: number, ttl: number): Promise<boolean>;
    protected generateKey(context: ExecutionContext, suffix: string): string;
    private getIP;
    private getUserAgent;
}
