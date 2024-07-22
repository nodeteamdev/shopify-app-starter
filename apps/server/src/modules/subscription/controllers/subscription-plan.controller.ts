import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { SubscriptionPlanService } from '@modules/subscription/services/subscription-plan.service';
import { ApiCreatedBaseResponse, ApiOkBaseResponse } from '@modules/common/decorators/api-ok-base-response.decorator';
import { CreateSubscriptionPlanDto } from '@modules/subscription/dtos/create-subscription-plan.dto';
import { SubscriptionPlanDto } from '@modules/subscription/dtos/subscription-plan.dto';

@Controller('subscription-plan')
@ApiTags('Subscription Plan')
@ApiExtraModels(SubscriptionPlanDto)
export class SubscriptionPlanController {
  constructor(private readonly subscriptionPlanService: SubscriptionPlanService) {}

  // TODO remove later
  @ApiCreatedBaseResponse({ dto: SubscriptionPlanDto })
  @Post()
  public create(@Body() createSubscriptionPlanDto: CreateSubscriptionPlanDto): Promise<SubscriptionPlanDto> {
    return this.subscriptionPlanService.create(createSubscriptionPlanDto);
  }

  @ApiOkBaseResponse({ dto: SubscriptionPlanDto, isArray: true })
  @Get()
  public getMany(): Promise<SubscriptionPlanDto[]> {
    return this.subscriptionPlanService.getMany();
  }

  @ApiOkBaseResponse({ dto: SubscriptionPlanDto })
  @Get(':id')
  public getOne(@Param('id') id: string): Promise<SubscriptionPlanDto> {
    return this.subscriptionPlanService.getOne(id);
  }
}
