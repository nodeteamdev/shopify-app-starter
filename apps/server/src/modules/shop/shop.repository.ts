import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { Injectable } from '@nestjs/common';
import { RequestReturn, Session } from '@shopify/shopify-api';
import { GraphQlBody } from '@modules/shop/interfaces/graphql-body.interface';
import { ShopInfo } from '@modules/shop/interfaces/shop-info.interface';

@Injectable()
export class ShopRepository {
  public getShopInfo(
    session: Session,
  ): Promise<RequestReturn<GraphQlBody<{ readonly shop: ShopInfo }>>> {
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
