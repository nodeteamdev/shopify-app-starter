import { PrismaModule } from '@modules/common/providers/prisma';
import { ShopModule } from '@modules/shop/shop.module';
import { ShopifyService } from '@modules/shopify-api/services/shopify.service';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { ShopifyAuthSessionRepository } from '@modules/shopify-auth/repositories/shopify-auth-session.repository';
import { ShopifyAuthStoreRepository } from '@modules/shopify-auth/repositories/shopify-auth-store.repository';
import { ShopifyAuthRedirectService } from '@modules/shopify-auth/services/shopify-auth-redirect.service';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { ShopifyAuthService } from '@modules/shopify-auth/services/shopify-auth.service';
import { ShopifyAuthController } from '@modules/shopify-auth/shopify-auth.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, ShopifyAppInstallModule, ShopModule],
  providers: [
    ShopifyAuthService,
    ShopifyAuthStoreRepository,
    ShopifyAuthRedirectService,
    ShopifyAuthSessionRepository,
    ShopifyAuthSessionService,
    ShopifyAuthRedirectService,
    ShopifyService,
  ],
  controllers: [ShopifyAuthController],
  exports: [ShopifyAuthSessionService],
})
export class ShopifyAuthModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(VerifyRequest).forRoutes(ShopifyAuthController);
  // }
}
