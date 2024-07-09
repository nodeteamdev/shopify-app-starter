import { Module } from '@nestjs/common';
import { AppSubscriptionService } from '@modules/app-subscription/app-subscription.service';
import { AppSubscriptionController } from '@modules/app-subscription/app-subscription.controller';
import { AppSubscriptionRepository } from '@modules/app-subscription/repositories/app-subscription.repository';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';
import { AppSubscriptionGraphqlRepository } from '@modules/app-subscription/repositories/app-subscription-graphql.repository';
import { PrismaModule } from '@modules/common/providers/prisma';

@Module({
  imports: [ShopifyAppInstallModule, ShopifyAuthModule, PrismaModule],
  providers: [AppSubscriptionService, AppSubscriptionRepository, AppSubscriptionGraphqlRepository],
  controllers: [AppSubscriptionController],
  exports: [AppSubscriptionRepository]
})
export class AppSubscriptionModule {}
