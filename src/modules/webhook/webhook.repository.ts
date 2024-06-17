import { Injectable } from '@nestjs/common';
import { PrismaService } from '@providers/prisma';
import { Prisma, Webhook } from '@prisma/client';

@Injectable()
export class WebhookRepository {
  constructor(private readonly prisma: PrismaService) {}

  public create(data: Prisma.WebhookCreateInput): Promise<Webhook> {
    return this.prisma.webhook.create({ data });
  }

  public findOneByWebhookId(webhookId: string): Promise<Webhook | null> {
    return this.prisma.webhook.findFirst({ where: { webhookId } });
  }
}
