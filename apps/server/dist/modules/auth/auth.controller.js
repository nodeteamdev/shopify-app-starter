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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_proxy_1 = require("../casl/proxies/user.proxy");
const api_base_responses_decorator_1 = require("../common/decorators/api-base-responses.decorator");
const api_ok_base_response_decorator_1 = require("../common/decorators/api-ok-base-response.decorator");
const serialize_decorator_1 = require("../common/decorators/serialize.decorator");
const transform_interceptor_1 = require("../common/interceptors/transform.interceptor");
const skip_auth_decorator_1 = require("./decorators/skip-auth.decorator");
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
const jwt_tokens_dto_1 = require("./dto/jwt-tokens.dto");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
const resend_verify_email_dto_1 = require("./dto/resend-verify-email.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const sign_in_dto_1 = require("./dto/sign-in.dto");
const sign_up_dto_1 = require("./dto/sign-up.dto");
const verify_email_dto_1 = require("./dto/verify-email.dto");
const tokens_entity_1 = require("./entities/tokens.entity");
const auth_service_1 = require("./services/auth.service");
const casl_1 = require("../casl");
const ip_ua_context_custom_throttler_guard_1 = require("../common/guards/ip-ua-context-custom-throttler.guard");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(body) {
        return this.authService.signUp(body);
    }
    verifyEmail(verifyEmailDto) {
        return this.authService.verifyEmail(verifyEmailDto);
    }
    async retryEmailVerification(resendVerifyEmailDto) {
        return this.authService.retryEmailVerification(resendVerifyEmailDto);
    }
    signIn(data) {
        return this.authService.signIn(data);
    }
    refreshToken(refreshTokenDto) {
        return this.authService.refreshTokens(refreshTokenDto.refreshToken);
    }
    async logout(userProxy) {
        const user = await userProxy.get();
        return this.authService.logout(user.id, user.sessionId);
    }
    forgotPassword(forgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto);
    }
    resetPassword(resetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60 } }),
    (0, api_ok_base_response_decorator_1.ApiCreatedBaseResponse)(),
    (0, serialize_decorator_1.Serialize)(jwt_tokens_dto_1.JwtTokensDto),
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60 } }),
    (0, swagger_1.ApiOkResponse)({ type: jwt_tokens_dto_1.JwtTokensDto }),
    (0, api_base_responses_decorator_1.ApiUnauthorizedBaseResponse)(),
    (0, api_base_responses_decorator_1.ApiForbiddenBaseResponse)(),
    (0, api_base_responses_decorator_1.ApiBadRequestBaseResponse)(),
    (0, swagger_1.ApiBody)({ type: verify_email_dto_1.VerifyEmailDto }),
    (0, common_1.Patch)('verify-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_email_dto_1.VerifyEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60 } }),
    (0, api_ok_base_response_decorator_1.ApiCreatedBaseResponse)(),
    (0, api_base_responses_decorator_1.ApiBadRequestBaseResponse)(),
    (0, swagger_1.ApiBody)({ type: resend_verify_email_dto_1.ResendVerifyEmailDto }),
    (0, common_1.Patch)('retry-email-verification'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resend_verify_email_dto_1.ResendVerifyEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "retryEmailVerification", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60 } }),
    (0, api_ok_base_response_decorator_1.ApiCreatedBaseResponse)({ dto: jwt_tokens_dto_1.JwtTokensDto }),
    (0, serialize_decorator_1.Serialize)(jwt_tokens_dto_1.JwtTokensDto),
    (0, api_base_responses_decorator_1.ApiUnauthorizedBaseResponse)(),
    (0, common_1.Post)('sign-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, throttler_1.Throttle)({ default: { limit: 2, ttl: 60 * 60 } }),
    (0, api_ok_base_response_decorator_1.ApiCreatedBaseResponse)({ dto: jwt_tokens_dto_1.JwtTokensDto }),
    (0, api_base_responses_decorator_1.ApiForbiddenBaseResponse)(),
    (0, api_base_responses_decorator_1.ApiUnauthorizedBaseResponse)(),
    (0, common_1.Post)('refresh-tokens'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 2, ttl: 60 } }),
    (0, api_base_responses_decorator_1.ApiUnauthorizedBaseResponse)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(204),
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(casl_1.AccessGuard),
    (0, casl_1.UseAbility)(casl_1.Actions.delete, tokens_entity_1.TokensEntity),
    __param(0, (0, casl_1.CaslUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_proxy_1.UserProxy]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60 } }),
    (0, api_ok_base_response_decorator_1.ApiCreatedBaseResponse)(),
    (0, api_base_responses_decorator_1.ApiBadRequestBaseResponse)(),
    (0, swagger_1.ApiBody)({ type: forgot_password_dto_1.ForgotPasswordDto }),
    (0, common_1.Patch)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60 } }),
    (0, swagger_1.ApiOkResponse)({ type: jwt_tokens_dto_1.JwtTokensDto }),
    (0, api_base_responses_decorator_1.ApiUnauthorizedBaseResponse)(),
    (0, api_base_responses_decorator_1.ApiForbiddenBaseResponse)(),
    (0, api_base_responses_decorator_1.ApiBadRequestBaseResponse)(),
    (0, swagger_1.ApiBody)({ type: reset_password_dto_1.ResetPasswordDto }),
    (0, common_1.Patch)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, api_base_responses_decorator_1.ApiInternalServerErrorBaseResponse)(),
    (0, api_base_responses_decorator_1.ApiBadRequestBaseResponse)(),
    (0, common_1.UseInterceptors)(transform_interceptor_1.TransformInterceptor),
    (0, common_1.UseGuards)(ip_ua_context_custom_throttler_guard_1.IpUaContextThrottlerGuard),
    (0, swagger_1.ApiExtraModels)(jwt_tokens_dto_1.JwtTokensDto),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map