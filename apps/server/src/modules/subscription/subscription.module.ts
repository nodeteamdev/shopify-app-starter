import { Module } from '@nestjs/common';
import { SubscriptionService } from '@modules/subscription/subscription.service';
import { SubscriptionController } from '@modules/subscription/subscription.controller';
import { SubscriptionRepository } from '@modules/subscription/subscription.repository';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';

@Module({
  imports: [ShopifyAppInstallModule, ShopifyAuthModule],
  providers: [SubscriptionService, SubscriptionRepository],
  controllers: [SubscriptionController]
})
export class SubscriptionModule {}
