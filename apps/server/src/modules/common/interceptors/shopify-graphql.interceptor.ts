import { ClientProviderService } from '@modules/client-provider/client-provider.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ShopifyGraphqlInterceptor implements NestInterceptor {
  constructor(private clientApi: ClientProviderService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    console.time(`[${request.url}] graphqlClient`);

    const { client, session } = await this.clientApi.graphqlClient({
      req: request,
      res: response,
      isOnline: true,
    });

    console.timeEnd(`[${request.url}] graphqlClient`);

    request.client = client;
    request.session = {
      ...session,
      shopShopifyId: parseInt(
        // @ts-ignore

        session.shopShopifyId.split('gid://shopify/Shop/')[1],
        10,
      ),
    };

    return next.handle();
  }
}
