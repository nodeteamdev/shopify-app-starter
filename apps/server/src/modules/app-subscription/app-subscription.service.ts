import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Session as ShopifySession,
  SubscriptionResponse,
} from '@shopify/shopify-api';
import { AppSubscription, AppSubscriptionStatusesEnum } from '@prisma/client';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { CreateAppSubscriptionDto } from '@modules/app-subscription/dtos/create-app-subscription.dto';
import { CreatedAppSubscription } from '@modules/app-subscription/interfaces/created-app-subscription.interface';
import { AppSubscriptionGraphqlRepository } from '@modules/app-subscription/repositories/app-subscription-graphql.repository';
import { AppSubscriptionRepository } from '@modules/app-subscription/repositories/app-subscription.repository';
import {
  APP_SUBSCRIPTION_INVALID_STATUS,
  APP_SUBSCRIPTION_NOT_FOUND,
} from '@modules/common/constants/errors.constants';
import { AppSubscriptionDto } from '@modules/app-subscription/dtos/app-subscription.dto';
import { ShopService } from '@modules/shop/shop.service';

@Injectable()
export class AppSubscriptionService {
  constructor(
    private readonly appSubscriptionGraphqlRepository: AppSubscriptionGraphqlRepository,
    private readonly shopifyAuthSessionService: ShopifyAuthSessionService,
    private readonly appSubscriptionRepository: AppSubscriptionRepository,
    private readonly shopService: ShopService,
  ) {}

  private static mapAppSubscription(
    createdAppSubscription: CreatedAppSubscription,
  ) {
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
    shopifySession: ShopifySession,
    createAppSubscriptionDto: CreateAppSubscriptionDto,
  ): Promise<AppSubscription> {
    const {
      body: {
        data: { appSubscriptionCreate },
      },
    } = await this.appSubscriptionGraphqlRepository.create(
      shopifySession,
      createAppSubscriptionDto,
    );

    const appSubscription = AppSubscriptionService.mapAppSubscription(
      appSubscriptionCreate,
    );

    const { shopId } = await this.shopifyAuthSessionService.getSession(
      shopifySession.id,
    );

    return this.appSubscriptionRepository.create({
      ...appSubscription,
      shop: { connect: { id: shopId } },
    });
  }

  public async createByShopName(
    shopName: string,
    createAppSubscriptionDto: CreateAppSubscriptionDto,
  ): Promise<AppSubscriptionDto> {
    const shopifySession =
      await this.shopifyAuthSessionService.getShopifySessionByShopName(
        shopName,
      );

    return this.create(shopifySession, createAppSubscriptionDto);
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

  public async update(
    id: string,
    status: AppSubscriptionStatusesEnum,
  ): Promise<AppSubscription> {
    await this.getOne(id);

    return this.appSubscriptionRepository.update(id, status);
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
}
