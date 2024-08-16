import { BulkOperationModule } from '@modules/bulk-operation/bulk-operation.module';
import { PrismaModule } from '@modules/common/providers/prisma';
import { MetafieldModule } from '@modules/metafield/metafield.module';
import { ShopModule } from '@modules/shop/shop.module';
import { ShopifyService } from '@modules/shopify-api/services/shopify.service';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { ShopifyAppInstallService } from '@modules/shopify-app-install/shopify-app-install.service';
import { ShopifyAuthRedirectService } from '@modules/shopify-auth/services/shopify-auth-redirect.service';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { ShopifyAuthService } from '@modules/shopify-auth/services/shopify-auth.service';
import { ShopifyAuthSessionRepository } from '@modules/shopify-auth/shopify-auth-session.repository';
import { ShopifyAuthController } from '@modules/shopify-auth/shopify-auth.controller';
import { SubscriptionModule } from '@modules/subscription/subscription.module';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [
    PrismaModule,
    ShopModule,
    BulkOperationModule,
    forwardRef(() => SubscriptionModule),
    MetafieldModule,
  ],
  providers: [
    ShopifyAuthService,
    ShopifyAuthRedirectService,
    ShopifyAuthSessionRepository,
    ShopifyAuthSessionService,
    ShopifyAuthRedirectService,
    ShopifyService,
    ShopifyAppInstallService,
    ShopifyAppInstallRepository,
  ],
  controllers: [ShopifyAuthController],
  exports: [ShopifyAuthSessionService],
})
export class ShopifyAuthModule {}
