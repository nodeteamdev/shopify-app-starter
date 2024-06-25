import { INestApplication, INestMicroservice, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaServiceOptions } from '@providers/prisma/interfaces';
export declare class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'info' | 'warn' | 'error'> implements OnModuleInit {
    private readonly prismaServiceOptions;
    constructor(prismaServiceOptions?: PrismaServiceOptions);
    onModuleInit(): Promise<void>;
    enableShutdownHooks(app: INestApplication | INestMicroservice): Promise<void>;
}
