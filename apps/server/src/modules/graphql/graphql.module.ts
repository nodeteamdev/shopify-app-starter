import { ClientProviderService } from '@modules/client-provider/client-provider.service';
import { VerifyRequest } from '@modules/common/middleware/verify-request.middleware';
import { GraphqlController } from '@modules/graphql/graphql.controller';
import { ShopifyModule } from '@modules/shopify-api/shopify.module';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { ShopifyAuthSessionRepository } from '@modules/shopify-auth/shopify-auth-session.repository';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PrismaModule } from '@providers/prisma';

@Module({
  imports: [ShopifyModule, PrismaModule],
  controllers: [GraphqlController],
  providers: [
    ClientProviderService,
    ShopifyAuthSessionService,
    ShopifyAuthSessionRepository,
  ],
})
export class GraphqlModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyRequest).forRoutes(GraphqlController);
  }
}
