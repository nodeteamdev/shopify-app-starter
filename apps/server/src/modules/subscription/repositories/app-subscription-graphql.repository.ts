import { Injectable } from '@nestjs/common';
import {
  RequestReturn,
  Session,
  SubscriptionResponse,
} from '@shopify/shopify-api';
import { GraphqlBody } from '@modules/product/shopify-product.repository';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { CreatedAppSubscription } from '@modules/subscription/interfaces/created-app-subscription.interface';
import { CanceledAppSubscription } from '@modules/subscription/interfaces/canceled-app-subscription.interface';
import { CreateAppSubscription } from '@modules/subscription/interfaces/create-app-subscription.interface';
import { ConfigService } from '@nestjs/config';
import { ShopifyConfig } from '@config/shopify.config';

@Injectable()
export class AppSubscriptionGraphqlRepository {
  constructor(private readonly configService: ConfigService) {}

  public async create(
    session: Session,
    createAppSubscription: CreateAppSubscription,
  ): Promise<
    RequestReturn<
      GraphqlBody<{ readonly appSubscriptionCreate: CreatedAppSubscription }>
    >
  > {
    const client = new ShopifyAppInstallRepository.shopify.clients.Graphql({
      session: new Session(session),
    });

    const { apiKey } = this.configService.get<ShopifyConfig>('shopify');

    const { name, amount, currencyCode } = createAppSubscription;

    const returnUrl = `https://${session.shop}/admin/apps/${apiKey}`;

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
