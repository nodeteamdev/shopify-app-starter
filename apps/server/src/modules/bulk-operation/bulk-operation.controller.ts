import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BulkOperationService } from '@modules/bulk-operation/bulk-operation.service';

@Controller('bulk-operation')
@ApiTags('Bulk Operation')
export class BulkOperationController {
  constructor(private readonly bulkOperationService: BulkOperationService) {}

  @Post(':shopName')
  public create(@Param('shopName') shopName: string) {
    return this.bulkOperationService.createAndGetBulkOperation(shopName);
  }

  @Get(':shopName/:bulkOperationId')
  public findOne(
    @Param('shopName') shopName: string,
    @Param('bulkOperationId') bulkOperationId: string,
  ) {
    return this.bulkOperationService.findOne(shopName, bulkOperationId);
  }
}
