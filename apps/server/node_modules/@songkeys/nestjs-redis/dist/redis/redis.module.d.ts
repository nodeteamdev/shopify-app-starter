import { DynamicModule, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { RedisModuleOptions, RedisModuleAsyncOptions } from './interfaces';
/**
 * @public
 */
export declare class RedisModule implements OnApplicationShutdown {
    private moduleRef;
    constructor(moduleRef: ModuleRef);
    /**
     * Registers the module synchronously.
     */
    static forRoot(options?: RedisModuleOptions, isGlobal?: boolean): DynamicModule;
    /**
     * Registers the module asynchronously.
     */
    static forRootAsync(options: RedisModuleAsyncOptions, isGlobal?: boolean): DynamicModule;
    onApplicationShutdown(): Promise<void>;
}
