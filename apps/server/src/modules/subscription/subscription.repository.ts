import { ShopifyAppInstallRepository } from "@modules/shopify-app-install/shopify-app-install.repository";
import { Injectable } from "@nestjs/common";
import { Session, SubscriptionResponse } from "@shopify/shopify-api";

@Injectable()
export class SubscriptionRepository {
  public findAll(session: Session): Promise<SubscriptionResponse> {
    console.log('session => ', session);
    return ShopifyAppInstallRepository.shopify.rest.RecurringApplicationCharge.all({
      session,
    });
  }
}