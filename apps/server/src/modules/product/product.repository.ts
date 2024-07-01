import { Injectable } from '@nestjs/common';
import { RequestReturn, Session } from '@shopify/shopify-api';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { ProductsQueryDto } from '@modules/product/dtos/products.query.dto';
import { Product } from '@modules/product/interfaces/product.interface';
import { ProductsWithPageInfo } from '@modules/product/interfaces/products-with-page-info.interface';


export interface GraphqlBody<T> {
  readonly data: T;
}

@Injectable()
export class ProductRepository {
  public findOne(
    session: Session,
    productId: string,
  ): Promise<
    RequestReturn<GraphqlBody<{ readonly product: Product }>>
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
    });
  }

  public findMany(
    session: Session,
    reqQuery: ProductsQueryDto,
  ): Promise<RequestReturn<GraphqlBody<ProductsWithPageInfo>>> {
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
    });
  }
}