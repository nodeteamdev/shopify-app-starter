import { ModuleMetadata, Type } from '@nestjs/common';
import { Prisma } from '@prisma/client';
export interface PrismaModuleOptions {
    isGlobal?: boolean;
    prismaServiceOptions?: PrismaServiceOptions;
}
export interface PrismaServiceOptions {
    prismaOptions?: Prisma.PrismaClientOptions;
    explicitConnect?: boolean;
    middlewares?: Array<Prisma.Middleware>;
}
export interface PrismaOptionsFactory {
    createPrismaOptions(): Promise<PrismaServiceOptions> | PrismaServiceOptions;
}
export interface PrismaModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    isGlobal?: boolean;
    useExisting?: Type<PrismaOptionsFactory>;
    useClass?: Type<PrismaOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<PrismaServiceOptions> | PrismaServiceOptions;
    inject?: any[];
}
