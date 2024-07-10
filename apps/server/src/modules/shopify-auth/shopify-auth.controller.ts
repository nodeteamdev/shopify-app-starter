import { Request, Response } from 'express';
import { Controller, Get, Req, Res, UseFilters } from '@nestjs/common';
import { ShopifyAuthService } from '@modules/shopify-auth/services/shopify-auth.service';
import { ShopifyAuthRedirectService } from '@modules/shopify-auth/services/shopify-auth-redirect.service';
import { ShopifyAuthException } from '@modules/shopify-auth/exceptions/shopify-auth.exception';

@Controller('shopify-auth')
export class ShopifyAuthController {
  constructor(
    private readonly shopifyAuthRedirectService: ShopifyAuthRedirectService,
    private readonly shopifyAuthService: ShopifyAuthService,
  ) {}

  @Get()
  @UseFilters(ShopifyAuthException)
  public authMiddleware(@Req() req: Request, @Res() res: Response): Promise<void> {
    return this.shopifyAuthRedirectService.redirect(req, res);
  }

  @Get('/offline')
  @UseFilters(ShopifyAuthException)
  public authOffline(@Req() req: Request, @Res() res: Response): Promise<void> {
    return this.shopifyAuthService.storeOfflineToken(req, res);
  }

  @Get('/online')
  @UseFilters(ShopifyAuthException)
  public async authOnline(@Req() req: Request, @Res() res: Response): Promise<void> {
    const shop = await this.shopifyAuthService.storeOnlineToken(req, res);

    res.status(200).redirect(`/?shop=${shop}&host=${req.query.host}`);
  }
}
