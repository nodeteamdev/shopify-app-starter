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
exports.AuthGuard = void 0;
const skip_auth_decorator_1 = require("../decorators/skip-auth.decorator");
const token_service_1 = require("../services/token.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
let AuthGuard = class AuthGuard {
    constructor(jwtService, configService, tokenService, reflector) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.tokenService = tokenService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        const isSkipAuth = this.reflector.getAllAndOverride(skip_auth_decorator_1.IS_SKIP_AUTH_KEY, [context.getHandler(), context.getClass()]);
        if (isSkipAuth) {
            return true;
        }
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const { access: { secret }, } = this.configService.get('jwt');
            const payload = await this.jwtService.verifyAsync(token, {
                secret,
            });
            const whitelistedToken = await this.tokenService.getAccessTokenFromWhitelist(payload.id, payload.sessionId);
            if (whitelistedToken !== token) {
                throw new common_1.UnauthorizedException();
            }
            request.user = payload;
            request.user._meta = {
                accessToken: token,
            };
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        token_service_1.TokenService,
        core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map