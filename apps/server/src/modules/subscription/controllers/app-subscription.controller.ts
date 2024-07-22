import { Controller, Param, Post } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { AppSubscriptionDto } from '@modules/subscription/dtos/app-subscription.dto';
import { ApiCreatedBaseResponse } from '@modules/common/decorators/api-ok-base-response.decorator';
import { AppSubscriptionService } from '@modules/subscription/services/app-subscription.service';

@Controller('app-subscription')
@ApiTags('App Subscription')
@ApiExtraModels(AppSubscriptionDto)
export class AppSubscriptionController {
  constructor(private readonly appSubscriptionService: AppSubscriptionService) {}

  @ApiCreatedBaseResponse({ dto: AppSubscriptionDto })
  @Post(':shopName/subscription-plan/:subscriptionPlanId')
  public create(
    @Param('shopName') shopName: string,
    @Param('subscriptionPlanId') subscriptionPlanId: string,
  ): Promise<AppSubscriptionDto> {
    return this.appSubscriptionService.create(
      shopName,
      subscriptionPlanId,
    );
  }
}
