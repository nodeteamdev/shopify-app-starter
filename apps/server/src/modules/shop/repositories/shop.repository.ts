import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/common/providers/prisma';
import {
  AppSubscriptionStatusesEnum,
  Prisma,
  Shop,
  ShopStatusesEnum,
  SubscriptionPlanStatusesEnum,
} from '@prisma/client';
import { extractIdFromShopify } from '@modules/common/helpers/extract-id-from-shopify.helper';
import { UpdateShop } from '@modules/shop/interfaces/update-shop.interface';
import { AppSubscriptionDto } from '@modules/subscription/dtos/app-subscription.dto';

@Injectable()
export class ShopRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public save(data: Prisma.ShopCreateInput): Promise<Shop> {
    return this.prismaService.shop.create({
      data: {
        id: extractIdFromShopify(data.id),
        name: data.name,
        email: data.email,
        contactEmail: data.contactEmail,
        myshopifyDomain: data.myshopifyDomain,
        primaryDomain: data.primaryDomain,
      },
    });
  }

  public findOne(id: string): Promise<Shop> {
    return this.prismaService.shop.findFirst({ where: { id } });
  }

  public update(id: string, data: UpdateShop): Promise<Shop> {
    return this.prismaService.shop.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  public delete(id: string): Promise<Shop> {
    return this.prismaService.shop.delete({ where: { id } });
  }

  public findOneByName(name: string): Promise<Shop> {
    return this.prismaService.shop.findFirst({ where: { name } });
  }

  public updateStatus(id: string, status: ShopStatusesEnum): Promise<Shop> {
    return this.prismaService.shop.update({
      where: { id },
      data: { status },
    });
  }

  public updateStatusWithAppUninstalledAt(
    id: string,
    status: ShopStatusesEnum,
  ): Promise<Shop> {
    return this.prismaService.shop.update({
      where: { id },
      data: {
        status,
        appUninstalledAt: new Date(),
      },
    });
  }

  public async subscriptionsShopAndSessionTransaction(
    appSubscription: AppSubscriptionDto,
    shopId: string,
  ): Promise<void> {
    const operations = [];

    if (appSubscription) {
      operations.push(
        this.prismaService.appSubscription.update({
          where: { id: appSubscription.id },
          data: { status: AppSubscriptionStatusesEnum.CANCELLED },
        }),
        this.prismaService.subscriptionPlan.update({
          where: { id: appSubscription.subscriptionPlanId },
          data: { status: SubscriptionPlanStatusesEnum.ACTIVE },
        }),
      );
    }

    operations.push(
      this.prismaService.session.deleteMany({ where: { shopId } }),
      this.prismaService.shop.update({
        where: { id: shopId },
        data: {
          status: ShopStatusesEnum.INACTIVE,
          appUninstalledAt: new Date(),
        },
      }),
    );

    await this.prismaService.$transaction(operations);
  }

  public findOneByPrimaryDomain(primaryDomain: string): Promise<Shop> {
    return this.prismaService.shop.findFirst({ where: { primaryDomain } });
  }
}
