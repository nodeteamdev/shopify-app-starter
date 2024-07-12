import { forwardRef, Module } from '@nestjs/common';
import { AppSubscriptionService } from '@modules/app-subscription/app-subscription.service';
import { AppSubscriptionRepository } from '@modules/app-subscription/repositories/app-subscription.repository';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';
import { AppSubscriptionGraphqlRepository } from '@modules/app-subscription/repositories/app-subscription-graphql.repository';
import { PrismaModule } from '@modules/common/providers/prisma';

@Module({
  imports: [
    forwardRef(() => ShopifyAppInstallModule),
    ShopifyAuthModule,
    PrismaModule,
  ],
  providers: [
    AppSubscriptionService,
    AppSubscriptionRepository,
    AppSubscriptionGraphqlRepository,
  ],
  exports: [AppSubscriptionService],
})
export class AppSubscriptionModule {}
