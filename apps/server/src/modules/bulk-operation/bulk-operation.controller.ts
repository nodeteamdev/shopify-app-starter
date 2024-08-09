import { Controller, Param, Post } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { BulkOperationService } from '@modules/bulk-operation/bulk-operation.service';
import { OrderDto } from '@modules/order/dtos/order.dto';
import { ApiCreatedBaseResponse } from '@modules/common/decorators/api-ok-base-response.decorator';

@Controller('bulk-operation')
@ApiExtraModels(OrderDto)
@ApiTags('Bulk Operation')
export class BulkOperationController {
  constructor(private readonly bulkOperationService: BulkOperationService) {}

  @ApiCreatedBaseResponse({ dto: OrderDto, isArray: true })
  @Post(':shopName')
  public create(@Param('shopName') shopName: string): Promise<OrderDto[]> {
    return this.bulkOperationService.parseAndSaveOrders(shopName);
  }
}
