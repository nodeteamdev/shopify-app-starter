import { PrismaService } from "@modules/common/providers/prisma";
import { ShopifyAuthActiveStore } from "@prisma/client";
export declare class ShopifyAuthActiveStoreRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    upsertShopifyActiveStore(shopName: string): Promise<ShopifyAuthActiveStore>;
}
