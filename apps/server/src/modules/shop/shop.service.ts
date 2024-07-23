import { Injectable, NotFoundException } from '@nestjs/common';
import { Session } from '@shopify/shopify-api';
import { ShopRepository } from '@modules/shop/repositories/shop.repository';
import { ShopInfo } from '@modules/shop/interfaces/shop-info.interface';
import { Shop, ShopStatusesEnum } from '@prisma/client';
import { SHOP_NOT_FOUND } from '@modules/common/constants/errors.constants';
import { CreateShop } from '@modules/shop/interfaces/create-shop.interface';
import { ShopifyShopRepository } from '@modules/shop/repositories/shopify-shop.repository';
import { UpdateShop } from '@modules/shop/interfaces/update-shop.interface';
import { AppSubscriptionDto } from '@modules/subscription/dtos/app-subscription.dto';

@Injectable()
export class ShopService {
  constructor(
    private readonly shopRepository: ShopRepository,
    private readonly shopifyShopRepository: ShopifyShopRepository,
  ) {}

  public create(createShop: CreateShop): Promise<Shop> {
    return this.shopRepository.save(createShop);
  }

  public findOne(id: string): Promise<Shop | null> {
    return this.shopRepository.findOne(id);
  }

  public async getOne(id: string): Promise<Shop> {
    const shop = await this.shopRepository.findOne(id);

    if (!shop) {
      throw new NotFoundException(SHOP_NOT_FOUND);
    }

    return shop;
  }

  public update(id: string, data: UpdateShop): Promise<Shop> {
    return this.shopRepository.update(id, data);
  }

  public delete(id: string): Promise<Shop> {
    return this.shopRepository.delete(id);
  }

  public async getShopInfo(session: Session): Promise<ShopInfo> {
    const {
      body: {
        data: { shop },
      },
    } = await this.shopifyShopRepository.getShopInfo(session);

    return shop;
  }

  public async getOneByName(name: string): Promise<Shop> {
    const shop = await this.shopRepository.findOneByName(name);

    if (!shop) {
      throw new NotFoundException(SHOP_NOT_FOUND);
    }

    return shop;
  }

  public updateStatus(id: string, status: ShopStatusesEnum): Promise<Shop> {
    return this.shopRepository.updateStatus(id, status);
  }

  public updateStatusWithAppUninstalledAt(id: string, status: ShopStatusesEnum): Promise<Shop> {
    return this.shopRepository.updateStatus(id, status);
  }

  public subscriptionsShopAndSessionTransaction(
    appSubscriptionDto: AppSubscriptionDto,
    shopId: string,
  ): Promise<void> {
    return this.shopRepository.subscriptionsShopAndSessionTransaction(
      appSubscriptionDto,
      shopId,
    )
  }
}
