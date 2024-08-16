import { Injectable } from '@nestjs/common';
import { ShopifyMetafieldRepository } from './shopify-metafield.repository';
import { Session } from '@shopify/shopify-api';
import { CreateShopifyMetafield } from '@modules/metafield/interfaces/create-shopify-metafield.interface';
import { ShopifyMetafield } from '@modules/metafield/interfaces/shopify-metafield.interface';

@Injectable()
export class MetafieldService {
  constructor(
    private readonly shopifyMetafieldRepository: ShopifyMetafieldRepository,
  ) {}

  public async create(
    session: Session,
    createShopifyMetafield: CreateShopifyMetafield[],
  ): Promise<ShopifyMetafield[]> {
    const {
      body: {
        data: {
          metafieldsSet: { metafields },
        },
      },
    } = await this.shopifyMetafieldRepository.create(
      session,
      createShopifyMetafield,
    );

    return metafields;
  }
}
