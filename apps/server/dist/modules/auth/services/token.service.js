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
exports.TokenService = void 0;
const node_crypto_1 = require("node:crypto");
const token_repository_1 = require("../repositories/token.repository");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let TokenService = class TokenService {
    constructor(jwtService, configService, tokenRepository) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.tokenRepository = tokenRepository;
    }
    async getAccessTokenFromWhitelist(userId, sessionId) {
        const key = this.tokenRepository.getAccessTokenKey(userId, sessionId);
        return this.tokenRepository.findToken(key);
    }
    async setRefreshToken(id, roles, sessionId) {
        const { refresh: { secret, expTime }, } = this.configService.get('jwt');
        const refreshToken = await this.jwtService.signAsync({ id, roles, sessionId }, {
            expiresIn: expTime.seconds,
            secret,
        });
        const key = this.tokenRepository.getRefreshTokenKey(id, sessionId);
        await this.tokenRepository.setRefreshToken(key, refreshToken);
        return refreshToken;
    }
    async setAccessToken(id, role, sessionId) {
        const { access: { secret, expTime }, } = this.configService.get('jwt');
        const accessToken = await this.jwtService.signAsync({ id, role, sessionId }, {
            expiresIn: expTime.seconds,
            secret,
        });
        const key = this.tokenRepository.getAccessTokenKey(id, sessionId);
        await this.tokenRepository.setAccessToken(key, accessToken);
        return accessToken;
    }
    async setResetPasswordToken(id, roles, sessionId) {
        const { resetPassword: { secret, expTime }, } = this.configService.get('jwt');
        const resetPasswordToken = await this.jwtService.signAsync({ id, roles, sessionId }, {
            expiresIn: expTime.seconds,
            secret,
        });
        const key = this.tokenRepository.getResetPasswordTokenKey(id, sessionId);
        await this.tokenRepository.setResetPasswordToken(key, resetPasswordToken);
        return resetPasswordToken;
    }
    async setVerifyEmailToken(id, roles, sessionId) {
        const { verifyEmail: { secret, expTime }, } = this.configService.get('jwt');
        const verifyEmailToken = await this.jwtService.signAsync({ id, roles, sessionId }, {
            expiresIn: expTime.seconds,
            secret,
        });
        const key = this.tokenRepository.getVerifyEmailTokenKey(id, sessionId);
        await this.tokenRepository.setVerifyEmailToken(key, verifyEmailToken);
        return verifyEmailToken;
    }
    async signTokens(userId, role, session) {
        const now = Date.now();
        const sessionId = session || `${(0, node_crypto_1.randomUUID)()};${now}`;
        const [accessToken, refreshToken] = await Promise.all([
            this.setAccessToken(userId, role, sessionId),
            this.setRefreshToken(userId, role, sessionId),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async refreshTokens(refreshToken) {
        const { refresh: { secret }, } = this.configService.get('jwt');
        let payload = null;
        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret,
            });
        }
        catch (_error) {
            throw new common_1.ForbiddenException('Incorrect token');
        }
        if (!payload) {
            throw new common_1.ForbiddenException('Incorrect token');
        }
        const refreshTokenKey = this.tokenRepository.getRefreshTokenKey(payload.id, payload.sessionId);
        const findRefreshToken = await this.tokenRepository.findToken(refreshTokenKey);
        if (!findRefreshToken || findRefreshToken !== refreshToken) {
            throw new common_1.ForbiddenException('Incorrect token');
        }
        return this.signTokens(payload.id, payload.role, payload.sessionId);
    }
    async deleteAuthTokes(userId, sessionId) {
        const accessTokenKey = this.tokenRepository.getAccessTokenKey(userId, sessionId);
        const refreshTokenKey = this.tokenRepository.getRefreshTokenKey(userId, sessionId);
        await this.tokenRepository.deleteMany([accessTokenKey, refreshTokenKey]);
    }
    async deleteAllResetPasswordTokens(userId) {
        const resetPasswordTokenKeysPattern = this.tokenRepository.getAllResetPasswordTokenKeysPattern(userId);
        const resetPasswordTokenKeys = await this.tokenRepository.findTokenKeys(resetPasswordTokenKeysPattern);
        if (resetPasswordTokenKeys.length > 0) {
            await this.tokenRepository.deleteMany(resetPasswordTokenKeys);
        }
    }
    async deleteAllVerifyEmailTokens(userId) {
        const verifyEmailTokenKeysPattern = this.tokenRepository.getAllVerifyEmailTokenKeysPattern(userId);
        const verifyEmailTokenKeys = await this.tokenRepository.findTokenKeys(verifyEmailTokenKeysPattern);
        if (verifyEmailTokenKeys.length > 0) {
            await this.tokenRepository.deleteMany(verifyEmailTokenKeys);
        }
    }
    createResetPasswordToken(id, roles) {
        const now = Date.now();
        const sessionId = `${(0, node_crypto_1.randomUUID)()};${now}`;
        return this.setResetPasswordToken(id, roles, sessionId);
    }
    createVerifyEmailToken(id, roles) {
        const now = Date.now();
        const sessionId = `${(0, node_crypto_1.randomUUID)()};${now}`;
        return this.setVerifyEmailToken(id, roles, sessionId);
    }
    async verifyResetPasswordToken(resetPasswordToken) {
        const { resetPassword: { secret }, } = this.configService.get('jwt');
        let payload = null;
        try {
            payload = await this.jwtService.verifyAsync(resetPasswordToken, {
                secret,
            });
        }
        catch (_error) {
            throw new common_1.ForbiddenException('Incorrect token');
        }
        if (!payload) {
            throw new common_1.ForbiddenException('Incorrect token');
        }
        const resetPasswordTokenKey = this.tokenRepository.getResetPasswordTokenKey(payload.id, payload.sessionId);
        const findResetPasswordToken = await this.tokenRepository.findToken(resetPasswordTokenKey);
        if (!findResetPasswordToken ||
            findResetPasswordToken !== resetPasswordToken) {
            throw new common_1.ForbiddenException('Incorrect token');
        }
        return payload;
    }
    async verifyVerifyEmailToken(verifyEmailToken) {
        const { verifyEmail: { secret }, } = this.configService.get('jwt');
        let payload = null;
        try {
            payload = await this.jwtService.verifyAsync(verifyEmailToken, {
                secret,
            });
        }
        catch (_error) {
            throw new common_1.ForbiddenException('Incorrect token');
        }
        if (!payload) {
            throw new common_1.ForbiddenException('Incorrect token');
        }
        const verifyEmailTokenKey = this.tokenRepository.getVerifyEmailTokenKey(payload.id, payload.sessionId);
        const findVerifyEmailToken = await this.tokenRepository.findToken(verifyEmailTokenKey);
        if (!findVerifyEmailToken || findVerifyEmailToken !== verifyEmailToken) {
            throw new common_1.ForbiddenException('Incorrect token');
        }
        return payload;
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        token_repository_1.TokenRepository])
], TokenService);
//# sourceMappingURL=token.service.js.map