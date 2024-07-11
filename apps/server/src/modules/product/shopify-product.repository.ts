import { ProductsQueryDto } from '@modules/product/dtos/products.query.dto';
import { ProductVariantsWithPageInfo } from '@modules/product/interfaces/product-variants-with-page-info.interface';
import { Product } from '@modules/product/interfaces/product.interface';
import { ProductsWithPageInfo } from '@modules/product/interfaces/products-with-page-info.interface';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { Injectable } from '@nestjs/common';
import { RequestReturn, Session } from '@shopify/shopify-api';

export interface GraphqlBody<T> {
  readonly data: T;
}

@Injectable()
export class ShopifyProductRepository {
  public findOne(
    session: Session,
    productId: string,
  ): Promise<RequestReturn<GraphqlBody<{ readonly product: Product }>>> {
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
    productsQueryDto: ProductsQueryDto,
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
          ...productsQueryDto,
        },
      },
    });
  }

  public findProductVariants(
    session: Session,
    reqQuery: ProductsQueryDto,
    productId: string,
  ): Promise<RequestReturn<GraphqlBody<ProductVariantsWithPageInfo>>> {
    const client = new ShopifyAppInstallRepository.shopify.clients.Graphql({
      session: new Session(session),
    });

    const query: string = `
    #graphql
    query GeVariantsForOneProduct($first: Int!, $after: String,  $query: String) {
      productVariants(first: $first, after: $after, query: $query) {
        nodes {
          id
          title
          price
          displayName
          image {
            altText
              url
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
          first: reqQuery.first,
          after: reqQuery.after,
          query: `product_id:${productId}`,
        },
      },
    });
  }

  public async count(session: Session) {
    const client = new ShopifyAppInstallRepository.shopify.clients.Graphql({
      session: new Session(session),
    });

    const query: string = `
    query {
      productsCount {
        count
      }
    }
  `;

    return client.query({
      data: {
        query,
      },
    });
  }
}
