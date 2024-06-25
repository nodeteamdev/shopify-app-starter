import { PrismaService } from '@modules/common/providers/prisma';
import { Prisma, Webhook } from '@prisma/client';
export declare class WebhookRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.WebhookCreateInput): Promise<Webhook>;
    findOneByWebhookId(webhookId: string): Promise<Webhook | null>;
}
