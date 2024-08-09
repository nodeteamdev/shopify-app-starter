import { GraphqlBody } from '@modules/product/shopify-product.repository';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { RequestReturn, Session } from '@shopify/shopify-api';
import { CreatedShopifyBulkOperation } from '@modules/bulk-operation/interfaces/created-shopify-bulk-operation.interface';
import { ShopifyBulkOperation } from '@modules/bulk-operation/interfaces/shopify-bulk-operation.interface';

export class ShopifyBulkOperationRepository {
  public create(
    session: Session,
  ): Promise<RequestReturn<GraphqlBody<CreatedShopifyBulkOperation>>> {
    const client = new ShopifyAppInstallRepository.shopify.clients.Graphql({
      session: new Session(session),
    });

    const data = `
      mutation {
        bulkOperationRunQuery(
          query: """
            {
              orders {
                edges {
                  node {
                    id
                    discountCodes
                    createdAt
                    currencyCode
                    displayFinancialStatus
                    lineItems(first: 10) {
                      edges {
                        node {
                          quantity
                          discountedTotal
                          originalTotal
                          product {
                            id
                          }
                          variant {
                            id
                            price
                            title
                            image {
                              url
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          """
        ) {
          bulkOperation {
            id
            status
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    return client.query({ data });
  }

  public findOne(
    session: Session,
    bulkOperationId: string,
  ): Promise<RequestReturn<GraphqlBody<{ node: ShopifyBulkOperation }>>> {
    const client = new ShopifyAppInstallRepository.shopify.clients.Graphql({
      session: new Session(session),
    });

    const query = `
      #graphql
      query ($id: ID!) {
        node(id: $id) {
          ... on BulkOperation {
            id
            status
            errorCode
            objectCount
            fileSize
            url
          }
        }
      }
    `;

    return client.query({
      data: {
        query,
        variables: {
          id: bulkOperationId,
        },
      },
    });
  }
}
