import { Injectable } from '@nestjs/common';
import { Session } from '@shopify/shopify-api';
import { ShopRepository } from '@modules/shop/shop.repository';
import { ShopInfo } from '@modules/shop/interfaces/shop-info.interface';

@Injectable()
export class ShopService {
  constructor(private readonly shopRepository: ShopRepository) {}

  public async getShopInfo(session: Session): Promise<ShopInfo> {
    const {
      body: {
        data: { shop },
      },
    } = await this.shopRepository.getShopInfo(session);

    return shop;
  }
}
