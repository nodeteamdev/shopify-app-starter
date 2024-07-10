import { Injectable, NotFoundException } from '@nestjs/common';
import { AppSubscription, AppSubscriptionStatusesEnum } from '@prisma/client';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { CreateAppSubscriptionDto } from '@modules/app-subscription/dtos/create-app-subscription.dto';
import { CreatedAppSubscription } from '@modules/app-subscription/interfaces/created-app-subscription.interface';
import { AppSubscriptionGraphqlRepository } from '@modules/app-subscription/repositories/app-subscription-graphql.repository';
import { AppSubscriptionRepository } from '@modules/app-subscription/repositories/app-subscription.repository';
import { APP_SUBSCRIPTION_NOT_FOUND } from '@modules/common/constants/errors.constants';
import { Session } from '@shopify/shopify-api';

@Injectable()
export class AppSubscriptionService {
  constructor(
    private readonly appSubscriptionGraphqlRepository: AppSubscriptionGraphqlRepository,
    private readonly shopifyAuthSessionService: ShopifyAuthSessionService,
    private readonly appSubscriptionRepository: AppSubscriptionRepository,
  ) {}

  private static mapAppSubscription(createdAppSubscription: CreatedAppSubscription) {
    const {
      confirmationUrl,
      appSubscription,
    } = createdAppSubscription;

    return {
      id: appSubscription.id,
      name: appSubscription.name,
      returnUrl: appSubscription.returnUrl,
      confirmationUrl,
      amount: +appSubscription.lineItems.flatMap((lineItem) => lineItem.plan.pricingDetails.price.amount),
      currencyCode: appSubscription.lineItems.flatMap((lineItem) => lineItem.plan.pricingDetails.price.currencyCode).toString(),
      status: appSubscription.status,
    }
  }

  public async create(session: Session, createAppSubscriptionDto: CreateAppSubscriptionDto): Promise<AppSubscription> {
    const {
      body: {
        data: { appSubscriptionCreate },
      },
    } = await this.appSubscriptionGraphqlRepository.create(session, createAppSubscriptionDto);

    const appSubscription = AppSubscriptionService.mapAppSubscription(appSubscriptionCreate);

    return this.appSubscriptionRepository.create(appSubscription);
  }

  public async getAll(shopName: string) {
    const session = await this.shopifyAuthSessionService.getSessionByShopName(shopName);

    return this.appSubscriptionGraphqlRepository.findAll(session);
  }

  public async getOne(id: string): Promise<AppSubscription> {
    const appSubscription = await this.appSubscriptionRepository.findOne(id);

    if (!appSubscription) {
      throw new NotFoundException(APP_SUBSCRIPTION_NOT_FOUND);
    }

    return appSubscription;
  }

  public async update(id: string, status: AppSubscriptionStatusesEnum): Promise<AppSubscription> {
    await this.getOne(id);

    return this.appSubscriptionRepository.update(id, status);
  }
}
