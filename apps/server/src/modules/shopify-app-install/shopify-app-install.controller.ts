import { AppConfig } from '@config/app.config';
import { Cookies, CookiesType } from '@decorators/cookies.decorator';
import { Controller, Get, Logger, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ShopifyAppInstallService } from '@modules/shopify-app-install/shopify-app-install.service';
import { ConfigService } from '@nestjs/config';
import { Session } from '@shopify/shopify-api';
import { WebhookConfig } from '@modules/shopify-app-install/interfaces/webhook-config.interface';
import { AppSubscriptionService } from '@modules/app-subscription/app-subscription.service';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';

@ApiTags('Shopify App Install')
@Controller('shopify-app-install')
export class ShopifyAppInstallController {
  private readonly logger: Logger = new Logger(
    ShopifyAppInstallController.name,
  );

  constructor(
    private readonly shopifyAppInstallService: ShopifyAppInstallService,
    private readonly configService: ConfigService,
    private readonly appSubscriptionService: AppSubscriptionService,
    private readonly shopifyAuthSessionService: ShopifyAuthSessionService,
  ) {}

  @Get('/install')
  public async installApp(
    @Query('shop') shop: string,
    @Cookies()
    { userId, webShopId }: CookiesType,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    this.shopifyAppInstallService.validateHmac(req.query);

    const { session } = req.query;
    const { clientHost } = this.configService.get<AppConfig>('app');

    if (shop && session) {
      this.logger.log(
        `The app has been open for the shop: ${shop}. The request will be redirected to the host: ${clientHost}`,
      );

      return res.redirect(`https://${clientHost}`);
    }

    this.logger.debug(
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

    this.logger.debug(
      `App install callback for the shop: ${shop}, userId: ${
        userId || 'none'
      }, webShopId: ${webShopId || 'none'}`,
    );

    const { session }: { session: Session } =
      await this.shopifyAppInstallService.finishAuth(req, res);

    const createdShop = await this.shopifyAppInstallService.setupShop(session);

    this.logger.debug(
      `Shop has been successfully setup for the shop: ${shop}: ${JSON.stringify(
        createdShop,
        null,
        2,
      )}`,
    );

    await this.shopifyAuthSessionService.save(session, createdShop.id);

    this.logger.debug(
      `Offline Session has been retrieved for the shop: ${shop}: ${JSON.stringify(
        { session },
        null,
        2,
      )}`,
    );

    const { confirmationUrl } = await this.appSubscriptionService.create(
      session,
      {
        name: 'sub-test',
        returnUrl: 'https://return-url.com',
        amount: 10,
        currencyCode: 'USD',
      },
    );

    // TODO should redirect user to confirmation url from appSubscription where he can purchase subscription
    this.logger.log(`Subscription url: ${confirmationUrl}`);

    const webhookConfigs: WebhookConfig[] =
      await this.shopifyAppInstallService.setupWebhooks(session);

    this.logger.debug(
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
