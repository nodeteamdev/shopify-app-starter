import { Session } from '@shopify/shopify-api';
import { ShopifyAuthSessionRepository } from '@modules/shopify-auth/repositories/shopify-session.repository';
import { ConfigService } from '@nestjs/config';
export declare class ShopifyAuthSessionService {
    private readonly shopifyAuthSessionRepository;
    private readonly configService;
    private cryptr;
    constructor(shopifyAuthSessionRepository: ShopifyAuthSessionRepository, configService: ConfigService);
    storeSession(session: Session): Promise<boolean>;
    loadSession(id: string): Promise<Session | null>;
    loadSessionByShop(id: string): Promise<Session | null>;
    deleteSession(id: string): Promise<boolean>;
    private encrypt;
    private decrypt;
}
