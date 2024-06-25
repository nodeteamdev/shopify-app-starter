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
exports.TokenRepository = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const redis_service_1 = require("../../common/providers/redis/redis.service");
let TokenRepository = class TokenRepository {
    constructor(configService, redisService) {
        this.configService = configService;
        this.redisService = redisService;
    }
    findToken(key) {
        return this.redisService.getOne(key);
    }
    findManyTokens(keys) {
        return this.redisService.getMany(keys);
    }
    findTokenKeys(keysPattern) {
        return this.redisService.getKeys(keysPattern);
    }
    async setRefreshToken(key, token) {
        const { refresh: { expTime: { seconds }, }, } = this.configService.get('jwt');
        await this.redisService.setOneWithExpire(key, token, seconds);
    }
    async setAccessToken(key, token) {
        const { access: { expTime: { seconds }, }, } = this.configService.get('jwt');
        await this.redisService.setOneWithExpire(key, token, seconds);
    }
    async setResetPasswordToken(key, token) {
        const { resetPassword: { expTime: { seconds }, }, } = this.configService.get('jwt');
        await this.redisService.setOneWithExpire(key, token, seconds);
    }
    async setVerifyEmailToken(key, token) {
        const { verifyEmail: { expTime: { seconds }, }, } = this.configService.get('jwt');
        await this.redisService.setOneWithExpire(key, token, seconds);
    }
    getAllResetPasswordTokenKeysPattern(userId) {
        return `USERS;${userId};SESSIONS;*;*;RESET_PASSWORD_TOKEN`;
    }
    getAllVerifyEmailTokenKeysPattern(userId) {
        return `USERS;${userId};SESSIONS;*;*;VERIFY_EMAIL_TOKEN`;
    }
    getRefreshTokenKey(userId, sessionId) {
        return `USERS;${userId};SESSIONS;${sessionId};REFRESH_TOKEN`;
    }
    getAccessTokenKey(userId, sessionId) {
        return `USERS;${userId};SESSIONS;${sessionId};ACCESS_TOKEN`;
    }
    getResetPasswordTokenKey(userId, sessionId) {
        return `USERS;${userId};SESSIONS;${sessionId};RESET_PASSWORD_TOKEN`;
    }
    getVerifyEmailTokenKey(userId, sessionId) {
        return `USERS;${userId};SESSIONS;${sessionId};VERIFY_EMAIL_TOKEN`;
    }
    delete(key) {
        return this.redisService.delete(key);
    }
    deleteMany(keys) {
        return this.redisService.deleteMany(keys);
    }
};
exports.TokenRepository = TokenRepository;
exports.TokenRepository = TokenRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        redis_service_1.RedisService])
], TokenRepository);
//# sourceMappingURL=token.repository.js.map