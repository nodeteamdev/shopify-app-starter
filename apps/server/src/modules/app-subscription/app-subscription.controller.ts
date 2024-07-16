import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppSubscriptionService } from '@modules/app-subscription/app-subscription.service';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { AppSubscriptionDto } from './dtos/app-subscription.dto';
import { CreateAppSubscriptionDto } from './dtos/create-app-subscription.dto';
import { ApiCreatedBaseResponse } from '@modules/common/decorators/api-ok-base-response.decorator';

@Controller('app-subscription')
@ApiTags('App Subscription')
@ApiExtraModels(AppSubscriptionDto)
export class AppSubscriptionController {
  constructor(
    private readonly appSubscriptionService: AppSubscriptionService,
  ) {}

  // @ApiCreatedBaseResponse({ dto: AppSubscriptionDto })
  // @Post(':shopName')
  // public create(
  //   @Param('shopName') shopName: string,
  //   @Body() createAppSubscriptionDto: CreateAppSubscriptionDto,
  // ): Promise<AppSubscriptionDto> {
  //   return this.appSubscriptionService.createByShopName(
  //     shopName,
  //     createAppSubscriptionDto,
  //   );
  // }

  @ApiCreatedBaseResponse({ dto: AppSubscriptionDto, isArray: true })
  @Get(':shopName')
  public getManyByShopName(
    @Param('shopName') shopName: string,
  ): Promise<AppSubscriptionDto[]> {
    return this.appSubscriptionService.getManyByShopName(shopName);
  }

  @Delete(':id/shop/:shopName')
  public delete(
    @Param('id') id: string,
    @Param('shopName') shopName: string,
  ): Promise<void> {
    return this.appSubscriptionService.delete(id, shopName);
  }
}
