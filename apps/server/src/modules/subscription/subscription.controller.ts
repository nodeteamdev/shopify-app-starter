import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
@ApiTags('Subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get(':shopName')
  public getAll(
    @Param('shopName') shopName: string,
  ) {
    return this.subscriptionService.getAll(shopName);
  }
}
