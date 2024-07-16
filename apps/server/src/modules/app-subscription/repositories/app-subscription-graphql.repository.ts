import { Injectable } from '@nestjs/common';
import {
  RequestReturn,
  Session,
  SubscriptionResponse,
} from '@shopify/shopify-api';
import { CreateAppSubscriptionDto } from '@modules/app-subscription/dtos/create-app-subscription.dto';
import { GraphqlBody } from '@modules/product/shopify-product.repository';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { CreatedAppSubscription } from '@modules/app-subscription/interfaces/created-app-subscription.interface';
import { CanceledAppSubscription } from '@modules/app-subscription/interfaces/canceled-app-subscription.interface';

@Injectable()
export class AppSubscriptionGraphqlRepository {
  public async create(
    session: Session,
    createAppSubscriptionDto: CreateAppSubscriptionDto,
  ): Promise<
    RequestReturn<
      GraphqlBody<{ readonly appSubscriptionCreate: CreatedAppSubscription }>
    >
  > {
    const client = new ShopifyAppInstallRepository.shopify.clients.Graphql({
      session: new Session(session),
    });

    const { name, returnUrl, amount, currencyCode } = createAppSubscriptionDto;

    // TODO currency it's only for a test purpose due to test flag
    const queryData = `
      #graphql
      mutation appSubscriptionCreate($name: String!, $returnUrl: URL!, $amount: Decimal!, $currencyCode: CurrencyCode!) {
        appSubscriptionCreate(
          name: $name,
          returnUrl: $returnUrl,
          test: true,
          lineItems: [
            {
              plan: {
                appRecurringPricingDetails: {
                  price: { amount: $amount, currencyCode: $currencyCode }
                }
              }
            }
          ]
        ) {
          confirmationUrl
          appSubscription {
            id
            lineItems {
              id
              plan {
                pricingDetails {
                  ... on AppRecurringPricing {
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
            name
            returnUrl
            status
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    return client.query({
      data: {
        query: queryData,
        variables: {
          name,
          returnUrl,
          amount,
          currencyCode,
        },
      },
    });
  }

  public cancel(
    session: Session,
    id: string,
  ): Promise<
    RequestReturn<
      GraphqlBody<{ readonly appSubscriptionCancel: CanceledAppSubscription }>
    >
  > {
    const client = new ShopifyAppInstallRepository.shopify.clients.Graphql({
      session: new Session(session),
    });

    const queryData = `
      #graphql
      mutation AppSubscriptionCancel($id: ID!) {
        appSubscriptionCancel(id: $id) {
          appSubscription {
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

    return client.query({
      data: {
        query: queryData,
        variables: {
          id,
        },
      },
    });
  }

  public findAll(session: Session): Promise<SubscriptionResponse> {
    return ShopifyAppInstallRepository.shopify.rest.RecurringApplicationCharge.all(
      {
        session,
      },
    );
  }

  public findOne(session: Session, id: number): Promise<SubscriptionResponse> {
    return ShopifyAppInstallRepository.shopify.rest.RecurringApplicationCharge.find(
      {
        session,
        id,
      },
    );
  }
}
