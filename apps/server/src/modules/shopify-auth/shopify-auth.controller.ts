import { ShopifyAuthRedirectService } from '@modules/shopify-auth/services/shopify-auth-redirect.service';
import { ShopifyAuthService } from '@modules/shopify-auth/services/shopify-auth.service';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('shopify-auth')
export class ShopifyAuthController {
  constructor(
    private readonly shopifyAuthRedirectService: ShopifyAuthRedirectService,
    private readonly shopifyAuthService: ShopifyAuthService,
  ) {}

  @Get()
  public authMiddleware(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    return this.shopifyAuthRedirectService.redirect(req, res);
  }

  @Get('/offline')
  public authOffline(@Req() req: Request, @Res() res: Response): Promise<void> {
    return this.shopifyAuthService.storeOfflineToken(req, res);
  }

  @Get('/online')
  public async authOnline(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const shop = await this.shopifyAuthService.storeOnlineToken(req, res);

    res.status(200).redirect(`/?shop=${shop}&host=${req.query.host}`);
  }
}
