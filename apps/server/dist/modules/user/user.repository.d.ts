import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@providers/prisma';
export declare class UserRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<User>;
    update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
    find(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}
