/// <reference types="cookie-parser" />
import { RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { MandatoryWebhookService } from '@modules/mandatory-webhook/mandatory-webhook.service';
export declare class MandatoryWebhookController {
    private readonly mandatoryWebhookService;
    constructor(mandatoryWebhookService: MandatoryWebhookService);
    customerDataRequest(req: RawBodyRequest<Request>): Promise<void>;
    customerRedact(req: RawBodyRequest<Request>): Promise<void>;
    shopRedact(req: RawBodyRequest<Request>): Promise<void>;
}
