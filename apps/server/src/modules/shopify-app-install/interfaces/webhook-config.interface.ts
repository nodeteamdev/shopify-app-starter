import { WebhookTopicType } from '@modules/shopify-app-install/types/webhook-topic.type';

export interface WebhookConfig {
  readonly topic: WebhookTopicType;
  readonly callbackUrl: string;
  readonly deliveryMethod: 'http';
}
