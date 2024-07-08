import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class IsShopActive implements NestMiddleware {
  async use(req: Request, _res: Response, next: NextFunction) {
    const shop = req.query.shop;
    if (!shop) {
      next();
      return;
    }

    try {
      const _shopAsString: string = shop as string;

      /**
       * TODO. Handle Active Shop
       */
      next();
    } catch (error) {
      next(error);
    }
  }
}
