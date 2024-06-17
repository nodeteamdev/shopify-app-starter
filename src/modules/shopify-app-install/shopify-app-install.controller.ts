import { Cookies, CookiesType } from "@decorators/cookies.decorator";
import { Controller, Get, Logger, Query, Req, Res } from "@nestjs/common";
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ShopifyAppInstallService } from "./shopify-app-install.service";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@config/app.config";

@ApiTags('Shopify')
@Controller('shopify')
export class ShopifyAppInstallController {
  constructor(
    private readonly shopifyAppInstallService: ShopifyAppInstallService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/install')
  public async installApp(
    @Query('shop') shop: string,
    @Cookies()
    { upBoostUserId: userId, upBoostWebShopId: webShopId }: CookiesType,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    this.shopifyAppInstallService.validateHmac(req.query);

    const { session } = req.query;
    const { clientHost } = this.configService.get<AppConfig>('app');

    if (shop && session) {
      Logger.log(
        `The app has been open for the shop: ${shop}. The request will be redirected to the UpBoost host: ${clientHost}`,
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
}
