import { ShopifyConfig } from '@config/shopify.config';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestReturn, Session } from '@shopify/shopify-api';


export interface GraphqlBody<T> {
  readonly data: T;
}

@Injectable()
export class ProductRepository {
  constructor(private readonly configService: ConfigService) {}

  public getOneProduct(
    session: Session,
    productId: string,
  ): Promise<
    RequestReturn<GraphqlBody<{ readonly product: any }>>
  > {
    const client = new ShopifyAppInstallRepository.shopify.clients.Graphql({
      session: new Session(session),
    });

    const query: string = `
      #graphql
      query ($id: ID!) {
          product(id: $id) {
              legacyResourceId
              title
              createdAt
              productCategory {
                  productTaxonomyNode {
                      name
                  }
              }
              priceRangeV2 {
                  maxVariantPrice {
                      amount
                      currencyCode
                  }
                  minVariantPrice {
                      amount
                      currencyCode
                  }
              }
              productType
              featuredImage {
                  url
                  altText
              }
          }
      }
    `;

    return client.query({
      data: {
        query,
        variables: {
          id: `gid://shopify/Product/${productId}`,
        },
      },
      tries: this.getMaxTries(),
    });
  }

  public getProducts(
    session: Session,
    reqQuery: any,
  ): Promise<RequestReturn<GraphqlBody<any>>> {
    const client = new ShopifyAppInstallRepository.shopify.clients.Graphql({
      session: new Session(session),
    });

    const query: string = `
        #graphql
        query ($first: Int, $after: String, $reverse: Boolean, $sortKey: ProductSortKeys, $query: String) {
            products(first: $first, after: $after, reverse: $reverse, sortKey: $sortKey, query: $query) {
                nodes {
                    legacyResourceId
                    title
                    createdAt
                    status
                    productCategory {
                        productTaxonomyNode {
                            name
                        }
                    }
                    priceRangeV2 {
                        maxVariantPrice {
                            amount
                            currencyCode
                        }
                        minVariantPrice {
                            amount
                            currencyCode
                        }
                    }
                    productType
                    featuredImage {
                        url
                        altText
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    `;

    return client.query({
      data: {
        query,
        variables: {
          ...reqQuery,
        },
      },
      tries: this.getMaxTries(),
    });
  }

  private getMaxTries(): number {
    return this.configService.get<ShopifyConfig>('shopify').maxTries;
  }
}