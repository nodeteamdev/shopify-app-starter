import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { Injectable } from '@nestjs/common';
import { RequestReturn, Session } from '@shopify/shopify-api';
import { IGraphqlBody } from '@modules/shop/interfaces/graphql-body.interface';
import { IShopInfo } from '@modules/shop/interfaces/shop-info.interface';

@Injectable()
export class ShopRepository {
  constructor() {}

  public getShopInfo(
    session: Session,
  ): Promise<RequestReturn<IGraphqlBody<{ readonly shop: IShopInfo }>>> {
    const client = new ShopifyAppInstallRepository.shopify.clients.Graphql({
      session: new Session(session),
    });

    const data = `
      {
        shop {
          id
          name
          email
          contactEmail
          currencyCode
          myshopifyDomain
          primaryDomain {
            host
          }
        }
      }
    `;

    return client.query({
      data,
    });
  }
}
