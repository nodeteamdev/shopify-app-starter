import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type CookiesType = {
  readonly [key: string]: string;

  readonly userId?: string;

  readonly webShopId?: string;
};

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext): string | CookiesType => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  },
);
