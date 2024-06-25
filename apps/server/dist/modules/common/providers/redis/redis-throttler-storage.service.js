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
exports.RedisThrottlerStorageService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("./redis.service");
let RedisThrottlerStorageService = class RedisThrottlerStorageService {
    constructor(redis) {
        this.redis = redis;
    }
    async increment(key, ttl) {
        const throttlerKey = 'RATE_LIMITS;' + key;
        const totalHits = await this.redis.rpush(throttlerKey, Date.now() + ttl * 1000);
        const timeToExpire = await this.redis.ttl(throttlerKey);
        if (timeToExpire === -1) {
            await this.redis.pexpire(throttlerKey, ttl * 1000);
        }
        return {
            totalHits,
            timeToExpire,
        };
    }
};
exports.RedisThrottlerStorageService = RedisThrottlerStorageService;
exports.RedisThrottlerStorageService = RedisThrottlerStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], RedisThrottlerStorageService);
//# sourceMappingURL=redis-throttler-storage.service.js.map