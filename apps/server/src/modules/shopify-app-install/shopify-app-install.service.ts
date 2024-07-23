import { createHmac } from 'node:crypto';
import { Request, Response } from 'express';
import {
  Injectable,
  Logger,
  RawBodyRequest,
  UnauthorizedException,
} from '@nestjs/common';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { ShopifyRequestQuery } from '@modules/shopify-app-install/types/shopify-request-query-type';
import { Session, WebhookValidation } from '@shopify/shopify-api';
import { WebhookConfig } from '@modules/shopify-app-install/interfaces/webhook-config.interface';
import { ConfigService } from '@nestjs/config';
import { ShopifyConfig } from '@config/shopify.config';
import { WebhookTopicsEnum } from '@modules/shopify-app-install/enums/webhook-topics.enum';
import { ShopService } from '@modules/shop/shop.service';
import { Shop, ShopStatusesEnum } from '@prisma/client';
import { extractIdFromShopify } from '@modules/common/helpers/extract-id-from-shopify.helper';

@Injectable()
export class ShopifyAppInstallService {
  private readonly logger: Logger = new Logger(ShopifyAppInstallService.name);

  constructor(
    private readonly shopifyAppInstallRepository: ShopifyAppInstallRepository,
    private readonly configService: ConfigService,
    private readonly shopService: ShopService,
  ) {}

  public validateHmac(queryParams: ShopifyRequestQuery): boolean {
    const sharedSecret = process.env.SHOPIFY_API_SECRET;
    const { hmac, ...rest } = queryParams;

    const message = Object.entries(rest)
      .map(([key, value]) => {
        let resultValue: string;

        if (Array.isArray(value)) {
          resultValue = value.join('&');
        } else {
          resultValue = value as string;
        }

        return `${key}=${resultValue}`;
      })
      .sort()
      .join('&');

    const calculatedHmac = createHmac('sha256', sharedSecret)
      .update(message)
      .digest('hex');

    if (calculatedHmac !== hmac) {
      throw new UnauthorizedException('Error');
    }

    return true;
  }

  public beginAuth(req: Request, res: Response): Promise<string> {
    return this.shopifyAppInstallRepository.beginAuth(req, res);
  }

  public validateWebhook(
    req: RawBodyRequest<Request>,
  ): Promise<WebhookValidation> {
    return ShopifyAppInstallRepository.shopify.webhooks.validate({
      rawBody: req?.rawBody?.toString() || '',
      rawRequest: req,
    });
  }

  public finishAuth(
    req: Request,
    res: Response,
  ): Promise<{ session: Session }> {
    return this.shopifyAppInstallRepository.finishAuth(req, res);
  }

  public async setupWebhooks(session: Session): Promise<WebhookConfig[]> {
    const apiHost =
      this.configService.getOrThrow<ShopifyConfig>('shopify').hostName;

    const baseUrl = `https://${apiHost}/api/v1/webhook`;

    const webhookConfigs: WebhookConfig[] = [
      {
        topic: WebhookTopicsEnum.SHOP_UPDATE,
        callbackUrl: `${baseUrl}/update-shop`,
        deliveryMethod: 'http',
      },
      {
        topic: WebhookTopicsEnum.APP_UNINSTALLED,
        callbackUrl: `${baseUrl}/uninstall-app`,
        deliveryMethod: 'http',
      },
      {
        topic: WebhookTopicsEnum.APP_SUBSCRIPTIONS_UPDATE,
        callbackUrl: `${baseUrl}/update-app-subscription`,
        deliveryMethod: 'http',
      },
    ];

    await Promise.all(
      webhookConfigs.map(
        (config: WebhookConfig): Promise<void> =>
          this.createWebhook(session, config),
      ),
    );

    return webhookConfigs;
  }

  public createWebhook(
    session: Session,
    webhookConfig: WebhookConfig,
    includeFields: string[] = null,
  ): Promise<void> {
    return this.shopifyAppInstallRepository.createWebHook(
      session,
      webhookConfig,
      includeFields,
    );
  }

  public async setupShop(session: Session): Promise<Shop> {
    const shopInfo = await this.shopService.getShopInfo(session);

    const extractedShopId = extractIdFromShopify(shopInfo.id);

    const previouslyCreatedShop = await this.shopService.findOne(extractedShopId);

    if (previouslyCreatedShop) {
      this.logger.debug(
        `The shop was installed before. Shop info: ${JSON.stringify(
          previouslyCreatedShop,
          null,
          2,
        )}`,
      );

      await this.shopService.updateStatus(previouslyCreatedShop.id, ShopStatusesEnum.ACTIVE);

      return previouslyCreatedShop;
    }

    const shopCreateInput = {
      ...shopInfo,
      primaryDomain: shopInfo.primaryDomain.host,
    };

    return this.shopService.create(shopCreateInput);
  }
}
