import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SubscriptionResponse } from '@shopify/shopify-api';
import {
  AppSubscription,
  AppSubscriptionStatusesEnum,
  SubscriptionPlan,
  SubscriptionPlanStatusesEnum,
} from '@prisma/client';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { CreatedAppSubscription } from '@modules/subscription/interfaces/created-app-subscription.interface';
import { AppSubscriptionGraphqlRepository } from '@modules/subscription/repositories/app-subscription-graphql.repository';
import { AppSubscriptionRepository } from '@modules/subscription/repositories/app-subscription.repository';
import {
  APP_SUBSCRIPTION_INVALID_STATUS,
  APP_SUBSCRIPTION_NOT_FOUND,
} from '@modules/common/constants/errors.constants';
import { AppSubscriptionDto } from '@modules/subscription/dtos/app-subscription.dto';
import { ShopService } from '@modules/shop/shop.service';
import { SubscriptionPlanService } from '@modules/subscription/services/subscription-plan.service';
import { MappedAppSubscription } from '@modules/subscription/interfaces/mapped-app-subscription.interface';
import { CreateAppSubscription } from '@modules/subscription/interfaces/create-app-subscription.interface';
import { extractIdFromShopify } from '@modules/common/helpers/extract-id-from-shopify.helper';
import { UpdateStatuses } from '@modules/subscription/interfaces/update-statuses.interface';

@Injectable()
export class AppSubscriptionService {
  constructor(
    private readonly appSubscriptionGraphqlRepository: AppSubscriptionGraphqlRepository,
    private readonly shopifyAuthSessionService: ShopifyAuthSessionService,
    private readonly appSubscriptionRepository: AppSubscriptionRepository,
    private readonly shopService: ShopService,
    private readonly subscriptionPlanService: SubscriptionPlanService,
  ) {}

  private static mapAppSubscription(
    createdAppSubscription: CreatedAppSubscription,
  ): MappedAppSubscription {
    const { confirmationUrl, appSubscription } = createdAppSubscription;

    return {
      id: appSubscription.id,
      name: appSubscription.name,
      returnUrl: appSubscription.returnUrl,
      confirmationUrl,
      amount: +appSubscription.lineItems.flatMap(
        (lineItem) => lineItem.plan.pricingDetails.price.amount,
      ),
      currencyCode: appSubscription.lineItems
        .flatMap((lineItem) => lineItem.plan.pricingDetails.price.currencyCode)
        .toString(),
      status: appSubscription.status,
    };
  }

  public async create(
    shopName: string,
    subscriptionPlanId: string,
  ): Promise<AppSubscription> {
    const shopifySession =
      await this.shopifyAuthSessionService.getShopifySessionByShopName(
        shopName,
      );

    const subscriptionPlan =
      await this.subscriptionPlanService.getOne(subscriptionPlanId);

    const createAppSubscription: CreateAppSubscription = {
      name: subscriptionPlan.name,
      amount: subscriptionPlan.amount,
      currencyCode: subscriptionPlan.currencyCode,
    };

    const {
      body: {
        data: { appSubscriptionCreate },
      },
    } = await this.appSubscriptionGraphqlRepository.create(
      shopifySession,
      createAppSubscription,
    );

    const appSubscription = AppSubscriptionService.mapAppSubscription(
      appSubscriptionCreate,
    );

    const { shopId } = await this.shopifyAuthSessionService.getSession(
      shopifySession.id,
    );

    const createdAppSubscription = await this.appSubscriptionRepository.create({
      ...appSubscription,
      id: extractIdFromShopify(appSubscription.id),
      shop: { connect: { id: shopId } },
      subscriptionPlan: { connect: { id: subscriptionPlan.id } },
    });

    await this.subscriptionPlanService.updateStatus(
      subscriptionPlan.id,
      SubscriptionPlanStatusesEnum.ACTIVE,
    );

    return createdAppSubscription;
  }

  public async getManyFromShopify(
    shopName: string,
  ): Promise<SubscriptionResponse> {
    const shopifySession =
      await this.shopifyAuthSessionService.getShopifySessionByShopName(
        shopName,
      );

    return this.appSubscriptionGraphqlRepository.findAll(shopifySession);
  }

  public async getManyByShopName(shopName: string): Promise<AppSubscription[]> {
    const { id } = await this.shopService.getOneByName(shopName);

    return this.appSubscriptionRepository.findManyByShopId(id);
  }

  public async getOne(id: string): Promise<AppSubscription> {
    const appSubscription = await this.appSubscriptionRepository.findOne(id);

    if (!appSubscription) {
      throw new NotFoundException(APP_SUBSCRIPTION_NOT_FOUND);
    }

    return appSubscription;
  }

  public async updateStatus(
    id: string,
    status: AppSubscriptionStatusesEnum,
  ): Promise<AppSubscription> {
    await this.getOne(id);

    return this.appSubscriptionRepository.updateStatus(id, status);
  }

  public async delete(id: string, shopName: string): Promise<void> {
    const shopifySession =
      await this.shopifyAuthSessionService.getShopifySessionByShopName(
        shopName,
      );

    const { status } = await this.appSubscriptionRepository.findOne(id);

    if (status !== AppSubscriptionStatusesEnum.PENDING) {
      throw new BadRequestException(APP_SUBSCRIPTION_INVALID_STATUS);
    }

    await this.appSubscriptionGraphqlRepository.cancel(shopifySession, id);
    await this.appSubscriptionRepository.delete(id);
  }

  public findOne(id: string): Promise<AppSubscriptionDto> {
    return this.appSubscriptionRepository.findOne(id);
  }

  public findOneByShopId(shopId: string): Promise<AppSubscriptionDto> {
    return this.appSubscriptionRepository.findOneByShopId(shopId);
  }

  public updateStatuses(data: UpdateStatuses): Promise<[AppSubscription, SubscriptionPlan]> {
    return this.appSubscriptionRepository.updateStatuses(data);
  }
}
