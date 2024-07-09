import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppSubscriptionService } from '@modules/app-subscription/app-subscription.service';
import { CreateAppSubscriptionDto } from './dtos/create-app-subscription.dto';

@Controller('app-subscription')
@ApiTags('App Subscriptions')
export class AppSubscriptionController {
  constructor(private readonly appSubscriptionService: AppSubscriptionService) {}

  @Get(':shopName')
  public getAll(
    @Param('shopName') shopName: string,
  ) {
    return this.appSubscriptionService.getAll(shopName);
  }

  @Post(':shopName')
  public create(
    @Param('shopName') shopName: string,
    @Body() createAppSubscriptionDto: CreateAppSubscriptionDto,
  ) {
    return this.appSubscriptionService.create(shopName, createAppSubscriptionDto)
  }
}
