import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from '@modules/subscription/subscription.repository';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly shopifyAuthSessionService: ShopifyAuthSessionService,
  ) {}

  public async getAll(shopName: string) {
    const session = await this.shopifyAuthSessionService.getSessionByShopName(shopName);

    return this.subscriptionRepository.findAll(session);
  }
}
