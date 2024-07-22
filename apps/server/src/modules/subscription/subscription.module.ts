import { forwardRef, Module } from '@nestjs/common';
import { AppSubscriptionService } from '@modules/subscription/services/app-subscription.service';
import { AppSubscriptionGraphqlRepository } from '@modules/subscription/repositories/app-subscription-graphql.repository';
import { AppSubscriptionRepository } from '@modules/subscription/repositories/app-subscription.repository';
import { PrismaModule } from '@modules/common/providers/prisma';
import { AppSubscriptionController } from '@modules/subscription/controllers/app-subscription.controller';
import { ShopModule } from '@modules/shop/shop.module';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { SubscriptionPlanRepository } from '@modules/subscription/repositories/subscription-plan.repository';
import { SubscriptionPlanService } from '@modules/subscription/services/subscription-plan.service';
import { SubscriptionPlanController } from '@modules/subscription/controllers/subscription-plan.controller';

@Module({
  imports: [
    forwardRef(() => ShopifyAppInstallModule),
    ShopifyAuthModule,
    PrismaModule,
    ShopModule,
  ],
  providers: [
    AppSubscriptionService,
    AppSubscriptionRepository,
    AppSubscriptionGraphqlRepository,
    SubscriptionPlanService,
    SubscriptionPlanRepository,
  ],
  exports: [AppSubscriptionService],
  controllers: [AppSubscriptionController, SubscriptionPlanController],
})
export class SubscriptionModule {}
