import { Prisma, Webhook } from '@prisma/client';
import { WebhookRepository } from '@modules/webhook/webhook.repository';
export declare class WebhookService {
    private readonly webhookRepository;
    constructor(webhookRepository: WebhookRepository);
    create(data: Prisma.WebhookCreateInput): Promise<Webhook>;
    getOneByWebhookId(webhookId: string): Promise<Webhook | null>;
    isDuplicate(webhookId: string): Promise<boolean>;
}
