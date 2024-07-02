import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/common/providers/prisma';
import { ShopifyAuthService } from '@modules/shopify-auth/services/shopify-auth.service';
import { ShopifyAuthController } from '@modules/shopify-auth/shopify-auth.controller';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { ShopifyAuthRedirectService } from '@modules/shopify-auth/services/shopify-auth-redirect.service';
import { ShopifyAuthStoreRepository } from '@modules/shopify-auth/repositories/shopify-auth-store.repository';
import { ShopifyAuthSessionRepository } from '@modules/shopify-auth/repositories/shopify-auth-session.repository';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { ShopModule } from '@modules/shop/shop.module';

@Module({
  imports: [PrismaModule, ShopifyAppInstallModule, ShopModule],
  providers: [
    ShopifyAuthService,
    ShopifyAuthStoreRepository,
    ShopifyAuthRedirectService,
    ShopifyAuthSessionRepository,
    ShopifyAuthSessionService,
    ShopifyAuthRedirectService,
  ],
  controllers: [ShopifyAuthController]
})
export class ShopifyAuthModule {}
