import { ShopifyService } from '@modules/shopify-api/services/shopify.service';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { Injectable } from '@nestjs/common';
import { LATEST_API_VERSION, Shopify } from '@shopify/shopify-api';

@Injectable()
export class ClientProviderService {
  private currentApiVersion = LATEST_API_VERSION;
  private shopifyApi: Shopify<any> = null;

  constructor(
    private shopifyService: ShopifyService,
    private sessionService: ShopifyAuthSessionService,
  ) {
    this.shopifyApi = this.shopifyService.shopifyApi;
  }

  async fetchSession({ req, res, isOnline }) {
    console.time(`[${req.url}] getCurrentId`);

    const sessionId = await this.shopifyApi.session.getCurrentId({
      isOnline: isOnline,
      rawRequest: req,
      rawResponse: res,
    });

    console.timeEnd(`[${req.url}] getCurrentId`);

    console.time(`[${req.url}] loadSession`);

    const session = await this.sessionService.getShopifySession(sessionId);

    console.timeEnd(`[${req.url}] loadSession`);

    return session;
  }

  async graphqlClient({ req, res, isOnline }) {
    const session = await this.fetchSession({ req, res, isOnline });
    const client = new this.shopifyApi.clients.Graphql({ session });

    const { shop } = session;
    return { client, shop, session };
  }

  getGraphqlClientBySession({ session }) {
    return new this.shopifyApi.clients.Graphql({ session });
  }

  async restClient({ req, res, isOnline }) {
    const session = await this.fetchSession({ req, res, isOnline });
    const client = new this.shopifyApi.clients.Rest({
      session,
      apiVersion: this.currentApiVersion,
    });
    const { shop } = session;

    return { client, shop, session };
  }

  async fetchOfflineSession(shop: string): Promise<any> {
    const sessionID = this.shopifyApi.session.getOfflineId(shop);
    const session = await this.sessionService.getSession(sessionID);

    return session;
  }

  public offline = {
    graphqlClient: async ({ shop }: { shop: string }) => {
      const session = await this.fetchOfflineSession(shop);
      const client = new this.shopifyApi.clients.Graphql({ session });
      return { client, shop, session };
    },
    restClient: async ({ shop }) => {
      const session = await this.fetchOfflineSession(shop);
      const client = new this.shopifyApi.clients.Rest({
        session,
        apiVersion: this.currentApiVersion,
      });

      return { client, shop, session };
    },
  };
}
