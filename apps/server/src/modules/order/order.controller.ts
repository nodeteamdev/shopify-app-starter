import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOkBaseResponse } from '@modules/common/decorators/api-ok-base-response.decorator';
import { OrderService } from '@modules/order/order.service';
import { OrderDto } from '@modules/order/dtos/order.dto';

@Controller('order')
@ApiTags('Orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOkBaseResponse({ dto: OrderDto, isArray: true })
  @Get(':shopName')
  public findMany(@Param('shopName') shopName: string): Promise<OrderDto[]> {
    return this.orderService.findManyByShopId(shopName);
  }
}
