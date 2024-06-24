import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/common/providers/prisma';
import { ShopifyAuthService } from '@modules/shopify-auth/services/shopify-auth.service';
import { ShopifyAuthController } from '@modules/shopify-auth/shopify-auth.controller';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { ShopifyActiveStoreRepository } from '@modules/shopify-auth/repositories/shopify-active-store.repository';
import { ShopifyAuthRedirectService } from '@modules/shopify-auth/services/shopify-auth-redirect.service';
import { ShopifySessionRepository } from '@modules/shopify-auth/repositories/shopify-session.repository';
import { ShopifySessionService } from '@modules/shopify-auth/services/shopify-session.service';

@Module({
  imports: [PrismaModule, ShopifyAppInstallModule, ShopifyAppInstallModule],
  providers: [
    ShopifyAuthService,
    ShopifyActiveStoreRepository,
    ShopifyAuthRedirectService,
    ShopifySessionRepository,
    ShopifySessionService,
    ShopifyAuthRedirectService,
  ],
  controllers: [ShopifyAuthController]
})
export class ShopifyAuthModule {}
