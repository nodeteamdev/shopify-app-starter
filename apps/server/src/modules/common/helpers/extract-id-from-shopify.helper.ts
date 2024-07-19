import { BadRequestException } from '@nestjs/common';
import { INVALID_ID } from '@constants/errors.constants';

export const extractIdFromShopify = (id: string): string => {
  const shopId = id.split('/').at(-1);

  if (!shopId || isNaN(Number(shopId))) {
    throw new BadRequestException(INVALID_ID);
  }

  return shopId;
};
