import { Injectable } from '@nestjs/common';
import { Prisma, Webhook } from '@prisma/client';
import PrismaService from '@providers/prisma/prisma.service';

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
