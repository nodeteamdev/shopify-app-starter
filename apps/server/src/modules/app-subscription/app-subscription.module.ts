import { AppSubscriptionService } from '@modules/app-subscription/app-subscription.service';
import { AppSubscriptionGraphqlRepository } from '@modules/app-subscription/repositories/app-subscription-graphql.repository';
import { AppSubscriptionRepository } from '@modules/app-subscription/repositories/app-subscription.repository';
import { PrismaModule } from '@modules/common/providers/prisma';
import { AppSubscriptionController } from '@modules/app-subscription/app-subscription.controller';
import { ShopModule } from '@modules/shop/shop.module';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';

@Module({
  imports: [forwardRef(() => ShopifyAppInstallModule), ShopifyAuthModule, PrismaModule, ShopModule],
  providers: [AppSubscriptionService, AppSubscriptionRepository, AppSubscriptionGraphqlRepository],
  exports: [AppSubscriptionService],
  controllers: [AppSubscriptionController]
})

export class AppSubscriptionModule {}
