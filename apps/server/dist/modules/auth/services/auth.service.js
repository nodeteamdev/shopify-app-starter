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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const node_crypto_1 = require("node:crypto");
const promises_1 = require("node:timers/promises");
const node_util_1 = require("node:util");
const errors_constants_1 = require("../../common/constants/errors.constants");
const get_random_time_in_milliseconds_helper_1 = require("../../common/helpers/get-random-time-in-milliseconds.helper");
const token_service_1 = require("./token.service");
const email_service_1 = require("../../email/email.service");
const user_service_1 = require("../../user/user.service");
const common_1 = require("@nestjs/common");
const scryptPromise = (0, node_util_1.promisify)(node_crypto_1.scrypt);
let AuthService = AuthService_1 = class AuthService {
    constructor(userService, tokenService, emailService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.emailService = emailService;
    }
    static async hashPassword(password) {
        const salt = (0, node_crypto_1.randomBytes)(16).toString('hex');
        const buffer = await scryptPromise(password, salt, 64);
        return `${salt}:${buffer.toString('hex')}`;
    }
    static async isPasswordCorrect(passwordToCheck, validPassword) {
        const [salt, key] = validPassword.split(':');
        const validBuffer = Buffer.from(key, 'hex');
        const hashedBufferToCheck = await scryptPromise(passwordToCheck, salt, 64);
        return (0, node_crypto_1.timingSafeEqual)(hashedBufferToCheck, validBuffer);
    }
    async signUp(signUpDto) {
        const user = await this.userService.findByEmail(signUpDto.email);
        if (user) {
            throw new common_1.ConflictException(errors_constants_1.USER_CONFLICT);
        }
        const newUser = await this.userService.create({
            email: signUpDto.email,
            firstName: signUpDto.firstName,
            lastName: signUpDto.lastName,
            password: await AuthService_1.hashPassword(signUpDto.password),
        });
        await this.startEmailVerification(newUser);
    }
    async verifyEmail(verifyEmailDto) {
        const { token } = verifyEmailDto;
        const user = await this.tokenService.verifyVerifyEmailToken(token);
        await this.userService.update(user.id, {
            isEmailVerified: true,
        });
        await this.tokenService.deleteAllVerifyEmailTokens(user.id);
        return this.tokenService.signTokens(user.id, user.role, user.sessionId);
    }
    async retryEmailVerification(resendVerifyEmailDto) {
        const { email } = resendVerifyEmailDto;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            const millisecondsToWait = (0, get_random_time_in_milliseconds_helper_1.getRandomTimeInMilliseconds)(1, 4);
            return await (0, promises_1.setTimeout)(millisecondsToWait);
        }
        if (user.isEmailVerified) {
            throw new common_1.BadRequestException(errors_constants_1.EMAIL_IS_VERIFIED);
        }
        await this.startEmailVerification(user);
    }
    async startEmailVerification(user) {
        await this.tokenService.deleteAllVerifyEmailTokens(user.id);
        const verifyEmailToken = await this.tokenService.createVerifyEmailToken(user.id, [user.role]);
        await this.emailService.sendEmailVerificationEmail(user.email, verifyEmailToken);
    }
    async signIn(signInDto) {
        const { email, password } = signInDto;
        const user = await this.userService.findByEmail(email);
        if (!user || !user.password) {
            throw new common_1.UnauthorizedException();
        }
        const isValid = await AuthService_1.isPasswordCorrect(password, user.password);
        if (!isValid) {
            throw new common_1.UnauthorizedException();
        }
        return this.tokenService.signTokens(user.id, user.role);
    }
    refreshTokens(refreshToken) {
        return this.tokenService.refreshTokens(refreshToken);
    }
    logout(userId, sessionId) {
        return this.tokenService.deleteAuthTokes(userId, sessionId);
    }
    async forgotPassword(forgotPasswordDto) {
        const { email } = forgotPasswordDto;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            const millisecondsToWait = (0, get_random_time_in_milliseconds_helper_1.getRandomTimeInMilliseconds)(1, 4);
            return await (0, promises_1.setTimeout)(millisecondsToWait);
        }
        await this.tokenService.deleteAllResetPasswordTokens(user.id);
        const resetPasswordToken = await this.tokenService.createResetPasswordToken(user.id, [user.role]);
        await this.emailService.sendResetPasswordEmail(email, resetPasswordToken);
    }
    async resetPassword(resetPasswordDto) {
        const { password, token } = resetPasswordDto;
        const user = await this.tokenService.verifyResetPasswordToken(token);
        const hashedPassword = await AuthService_1.hashPassword(password);
        await this.userService.update(user.id, {
            password: hashedPassword,
        });
        await this.tokenService.deleteAllResetPasswordTokens(user.id);
        return this.tokenService.signTokens(user.id, user.role, user.sessionId);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        token_service_1.TokenService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map