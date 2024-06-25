"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const webhook_repository_1 = require("./webhook.repository");
const errors_constants_1 = require("../common/constants/errors.constants");
let WebhookService = class WebhookService {
    constructor(webhookRepository) {
        this.webhookRepository = webhookRepository;
    }
    create(data) {
        return this.webhookRepository.create(data);
    }
    async getOneByWebhookId(webhookId) {
        const webhook = await this.webhookRepository.findOneByWebhookId(webhookId);
        if (!webhook) {
            throw new common_1.NotFoundException(errors_constants_1.WEBHOOK_NOT_FOUND);
        }
        return webhook;
    }
    async isDuplicate(webhookId) {
        const webhook = await this.getOneByWebhookId(webhookId);
        if (webhook) {
            common_1.Logger.debug(`Webhook with id: ${webhookId} was already handled: ${webhook.createdAt}`);
            return true;
        }
        return false;
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [webhook_repository_1.WebhookRepository])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map