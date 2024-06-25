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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyAuthSessionService = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const shopify_api_1 = require("@shopify/shopify-api");
const common_1 = require("@nestjs/common");
const shopify_session_repository_1 = require("../repositories/shopify-session.repository");
const config_1 = require("@nestjs/config");
const errors_constants_1 = require("../../common/constants/errors.constants");
let ShopifyAuthSessionService = class ShopifyAuthSessionService {
    constructor(shopifyAuthSessionRepository, configService) {
        this.shopifyAuthSessionRepository = shopifyAuthSessionRepository;
        this.configService = configService;
        this.cryptr = new cryptr_1.default(this.configService.get('shopify.encryptionString'));
    }
    async storeSession(session) {
        const encryptedContent = this.encrypt(JSON.stringify(session));
        await this.shopifyAuthSessionRepository.upsert(session, encryptedContent);
        return true;
    }
    async loadSession(id) {
        const session = await this.shopifyAuthSessionRepository.findUnique(id);
        if (!session) {
            throw new common_1.NotFoundException(errors_constants_1.SESSION_NOT_FOUND);
        }
        if (session.content.length > 0) {
            const decryptedContent = this.decrypt(session.content);
            const sessionObj = JSON.parse(decryptedContent);
            return new shopify_api_1.Session(sessionObj);
        }
        return null;
    }
    async loadSessionByShop(id) {
        const sessions = await this.shopifyAuthSessionRepository.findMany(id);
        if (!sessions.length) {
            throw new common_1.NotFoundException(errors_constants_1.SESSIONS_NOT_FOUND);
        }
        const filteredSessions = sessions.filter((session) => !session.id.includes('offline'));
        if (filteredSessions.length > 0) {
            const decryptedContent = this.decrypt(filteredSessions[0].content);
            const sessionObj = JSON.parse(decryptedContent);
            return new shopify_api_1.Session(sessionObj);
        }
        return null;
    }
    async deleteSession(id) {
        await this.shopifyAuthSessionRepository.deleteMany(id);
        return true;
    }
    encrypt(data) {
        return this.cryptr.encrypt(data);
    }
    decrypt(encryptedData) {
        return this.cryptr.decrypt(encryptedData);
    }
};
exports.ShopifyAuthSessionService = ShopifyAuthSessionService;
exports.ShopifyAuthSessionService = ShopifyAuthSessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shopify_session_repository_1.ShopifyAuthSessionRepository,
        config_1.ConfigService])
], ShopifyAuthSessionService);
//# sourceMappingURL=shopify-session.service.js.map