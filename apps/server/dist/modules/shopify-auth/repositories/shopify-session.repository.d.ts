import { PrismaService } from "@modules/common/providers/prisma";
import { Session } from '@shopify/shopify-api';
import { Prisma, ShopifyAuthSession } from "@prisma/client";
export declare class ShopifyAuthSessionRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    upsert(session: Session, encryptedContent: string): Promise<ShopifyAuthSession>;
    findUnique(id: string): Promise<ShopifyAuthSession | null>;
    findMany(id: string): Promise<ShopifyAuthSession[]>;
    deleteMany(id: string): Promise<Prisma.BatchPayload>;
}
