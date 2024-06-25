import { DynamicModule } from '@nestjs/common';
import { CustomPrismaModuleAsyncOptions, CustomPrismaModuleOptions, PrismaClientLike } from '@providers/prisma/custom-prisma-options';
export declare class CustomPrismaModule {
    private static readonly logger;
    static forRoot<Client extends PrismaClientLike>(options: CustomPrismaModuleOptions<Client>): DynamicModule;
    static forRootAsync<Client extends PrismaClientLike>(options: CustomPrismaModuleAsyncOptions<Client>): DynamicModule;
    private static createAsyncProvider;
}
