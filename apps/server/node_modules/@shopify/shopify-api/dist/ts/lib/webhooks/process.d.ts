import { AdapterResponse } from '../../runtime/http';
import { ConfigInterface } from '../base-types';
import { HttpWebhookHandlerWithCallback, WebhookProcessParams, WebhookRegistry } from './types';
export declare function process(config: ConfigInterface, webhookRegistry: WebhookRegistry<HttpWebhookHandlerWithCallback>): ({ context, rawBody, ...adapterArgs }: WebhookProcessParams) => Promise<AdapterResponse>;
//# sourceMappingURL=process.d.ts.map