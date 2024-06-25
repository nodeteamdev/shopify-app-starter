import { INestApplicationContext } from '@nestjs/common';
import { PrismaClientLike } from '@providers/prisma/custom-prisma-options';
export declare class CustomPrismaService<Client extends PrismaClientLike> {
    client: Client;
    constructor(client: Client);
    enableShutdownHooks(app: INestApplicationContext): Promise<void>;
}
