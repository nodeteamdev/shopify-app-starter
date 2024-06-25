import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma, Webhook } from '@prisma/client';
import { WebhookRepository } from '@modules/webhook/webhook.repository';
import { WEBHOOK_NOT_FOUND } from '@modules/common/constants/errors.constants';

@Injectable()
export class WebhookService {
  constructor(private readonly webhookRepository: WebhookRepository) {}

  public create(data: Prisma.WebhookCreateInput): Promise<Webhook> {
    return this.webhookRepository.create(data);
  }

  public async  getOneByWebhookId(webhookId: string): Promise<Webhook | null> {
    const webhook = await this.webhookRepository.findOneByWebhookId(webhookId);

    if (!webhook) {
      throw new NotFoundException(WEBHOOK_NOT_FOUND);
    }

    return webhook;
  }

  public async isDuplicate(webhookId: string): Promise<boolean> {
    const webhook: Webhook | null = await this.getOneByWebhookId(webhookId);

    if (webhook) {
      Logger.debug(
        `Webhook with id: ${webhookId} was already handled: ${webhook.createdAt}`,
      );

      return true;
    }

    return false;
  }
}
