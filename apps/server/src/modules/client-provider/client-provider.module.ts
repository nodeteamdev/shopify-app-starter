import { Global, Module } from '@nestjs/common';

/* Modules */
import { ShopifyModule } from '@modules/shopify-api/shopify.module';
import { ClientProviderService } from './client-provider.service';

@Global()
@Module({
  imports: [ShopifyModule],
  providers: [ClientProviderService],
  exports: [ClientProviderService],
})
export class ClientProviderModule {}
