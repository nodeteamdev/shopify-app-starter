import { AppSubscriptionService } from '@modules/app-subscription/app-subscription.service';
import { AppSubscriptionGraphqlRepository } from '@modules/app-subscription/repositories/app-subscription-graphql.repository';
import { AppSubscriptionRepository } from '@modules/app-subscription/repositories/app-subscription.repository';
import { PrismaModule } from '@modules/common/providers/prisma';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ShopifyAuthModule, PrismaModule],
  providers: [
    AppSubscriptionService,
    AppSubscriptionRepository,
    AppSubscriptionGraphqlRepository,
  ],
  exports: [AppSubscriptionService],
})
export class AppSubscriptionModule {}
