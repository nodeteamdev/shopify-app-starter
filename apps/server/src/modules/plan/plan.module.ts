import { Module } from '@nestjs/common';
import { PlanService } from '@modules/plan/plan.service';
import { PlanController } from '@modules/plan/plan.controller';
import { PlanRepository } from '@modules/plan/plan.repository';

@Module({
  providers: [PlanService, PlanRepository],
  controllers: [PlanController],
  exports: [PlanService]
})
export class PlanModule {}
