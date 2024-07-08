import { AppConfig } from '@config/app.config';
import { Cookies, CookiesType } from '@decorators/cookies.decorator';
import { ShopifyAppInstallService } from '@modules/shopify-app-install/shopify-app-install.service';
import { Controller, Get, Logger, Query, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { ShopifyAppInstallService } from "@modules/shopify-app-install/shopify-app-install.service";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@config/app.config";
import { Cookies, CookiesType } from "@decorators/cookies.decorator";
import { Session } from "@shopify/shopify-api";
import { WebhookConfig } from '@modules/shopify-app-install/interfaces/webhook-config.interface';
import { Request, Response } from 'express';

@ApiTags('Shopify App Install')
@Controller('shopify-app-install')
export class ShopifyAppInstallController {
  constructor(
    private readonly shopifyAppInstallService: ShopifyAppInstallService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/install')
  public async installApp(
    @Query('shop') shop: string,
    @Cookies()
    { userId, webShopId }: CookiesType,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    console.log('hello from install');
    console.log('=======================', req.query);
    this.shopifyAppInstallService.validateHmac(req.query);

    const { session } = req.query;
    const { clientHost } = this.configService.get<AppConfig>('app');

    if (shop && session) {
      Logger.log(
        `The app has been open for the shop: ${shop}. The request will be redirected to the host: ${clientHost}`,
      );

      return res.redirect(`https://${clientHost}`);
    }

    Logger.debug(
      `Install app for shop: ${shop}, userId: ${userId || 'none'}, webShopId: ${
        webShopId || 'none'
      }`,
    );

    await this.shopifyAppInstallService.beginAuth(req, res);
  }

  @Get('/callback')
  public async callback(
    @Query('shop') shop: string,
    @Cookies()
    { userId, webShopId }: CookiesType,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    this.shopifyAppInstallService.validateHmac(req.query);

    Logger.debug(
      `App install callback for the shop: ${shop}, userId: ${
        userId || 'none'
      }, webShopId: ${webShopId || 'none'}`,
    );

    const { session }: { session: Session } =
      await this.shopifyAppInstallService.finishAuth(req, res);

    Logger.debug(
      `Offline Session has been retrieved for the shop: ${shop}: ${JSON.stringify(
        { session },
        null,
        2,
      )}`,
    );

    const webhookConfigs: WebhookConfig[] =
      await this.shopifyAppInstallService.setupWebhooks(session);

    Logger.debug(
      `Webhooks have been setup successfully for shop: ${shop}: ${JSON.stringify(
        { webhookConfigs },
        null,
        2,
      )}`,
    );

    // TODO change redirect to the dashboard when it's ready
    res.redirect('https://google.com');
  }
}
