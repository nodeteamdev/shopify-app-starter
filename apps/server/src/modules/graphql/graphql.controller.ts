import { Controller, Post, Req, Res, UseInterceptors } from '@nestjs/common';

import { ShopifyGraphql } from '@decorators/shopify-graphql.decorator';
import { ShopifyGraphqlInterceptor } from '@interceptors/shopify-graphql.interceptor';
import { ShopifyGraphqlSession } from '@interfaces/shopify-graphql-session.interface';
import { ShopifyService } from '@modules/shopify-api/services/shopify.service';

@Controller('graphql')
export class GraphqlController {
  constructor(private shopifyService: ShopifyService) {}

  @UseInterceptors(ShopifyGraphqlInterceptor)
  @Post()
  async graphql(
    @Req() req,
    @Res() res,
    @ShopifyGraphql() { session }: ShopifyGraphqlSession,
  ) {
    try {
      const response =
        await this.shopifyService.shopifyApi.clients.graphqlProxy({
          session,
          rawBody: req.body,
        });

      res.status(200).send(response.body);
    } catch (e) {
      console.error(`---> An error occured at GraphQL Proxy`, e);
      res.status(403).send(e);
    }
  }
}
