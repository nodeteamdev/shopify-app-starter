import { Module } from '@nestjs/common';
import { WebhookRepository } from '@modules/webhook/webhook.repository';
import { WebhookService } from '@modules/webhook/webhook.service';
import { PrismaModule } from '@modules/common/providers/prisma';

@Module({
  imports: [PrismaModule],
  providers: [WebhookService, WebhookRepository],
  exports: [WebhookService],
})
export class WebhookModule {}
