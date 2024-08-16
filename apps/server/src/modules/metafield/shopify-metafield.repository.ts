import { GraphQlBody } from "@modules/shop/interfaces/graphql-body.interface";
import { ShopifyAppInstallRepository } from "@modules/shopify-app-install/shopify-app-install.repository";
import { Injectable } from "@nestjs/common";
import { RequestReturn, Session } from "@shopify/shopify-api";
import { CreateShopifyMetafield } from "@modules/metafield/interfaces/create-shopify-metafield.interface";
import { CreatedShopifyMetafield } from "@modules/metafield/interfaces/created-shopify-metafield.interface";

@Injectable()
export class ShopifyMetafieldRepository {
  public create(
    session: Session,
    createShopifyMetafield: CreateShopifyMetafield[],
  ): Promise<RequestReturn<GraphQlBody<{ metafieldsSet: CreatedShopifyMetafield }>>> {
    const client = new ShopifyAppInstallRepository.shopify.clients.Graphql({
      session: new Session(session),
    });
  
    const mutation = `
      mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(
          metafields: $metafields
        ) {
          metafields {
            key
            namespace
            value
            createdAt
            updatedAt
          }
          userErrors {
            field
            message
            code
          }
        }
      }
    `;
  
    const variables = {
      metafields: createShopifyMetafield,
    };
  
    return client.query({
      data: {
        query: mutation,
        variables: variables,
      },
    });
  }
}
