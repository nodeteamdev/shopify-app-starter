import { DynamicModule, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ClusterModuleOptions, ClusterModuleAsyncOptions } from './interfaces';
/**
 * @public
 */
export declare class ClusterModule implements OnApplicationShutdown {
    private moduleRef;
    constructor(moduleRef: ModuleRef);
    /**
     * Registers the module synchronously.
     */
    static forRoot(options: ClusterModuleOptions, isGlobal?: boolean): DynamicModule;
    /**
     * Registers the module asynchronously.
     */
    static forRootAsync(options: ClusterModuleAsyncOptions, isGlobal?: boolean): DynamicModule;
    onApplicationShutdown(): Promise<void>;
}
