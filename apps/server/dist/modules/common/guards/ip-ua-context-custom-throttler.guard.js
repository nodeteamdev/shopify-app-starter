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
var IpUaContextThrottlerGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpUaContextThrottlerGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const hash_1 = require("@nestjs/throttler/dist/hash");
let IpUaContextThrottlerGuard = IpUaContextThrottlerGuard_1 = class IpUaContextThrottlerGuard extends throttler_1.ThrottlerGuard {
    constructor(options, storageService, reflector) {
        super(options, storageService, reflector);
        this.options = options;
        this.storageService = storageService;
        this.reflector = reflector;
        this.logger = new common_1.Logger(IpUaContextThrottlerGuard_1.name);
    }
    async handleRequest(context, limit, ttl) {
        const request = context.switchToHttp().getRequest();
        const ip = this.getIP(request);
        const userAgent = this.getUserAgent(request);
        this.logger.debug(`IP of the client: ${ip}`);
        this.logger.debug(`User Agent of the client: ${userAgent}`);
        const suffix = `${ip}:${userAgent}`;
        const key = this.generateKey(context, suffix);
        this.logger.debug(`TTL: ${ttl}, LIMIT: ${limit}`);
        const { totalHits } = await this.storageService.increment(key, ttl);
        if (totalHits > limit) {
            throw new throttler_1.ThrottlerException();
        }
        return true;
    }
    generateKey(context, suffix) {
        const prefix = `${context.getClass().name}-${context.getHandler().name}`;
        return (0, hash_1.md5)(`${prefix}-${suffix}`);
    }
    getIP(request) {
        const ip = request.get('x-forwarded-for') ||
            request.socket.remoteAddress ||
            request.ip;
        if (ip)
            return ip;
        throw new common_1.BadRequestException('Cant identify the IP address of the client');
    }
    getUserAgent(request) {
        const userAgent = request.get('user-agent');
        if (userAgent)
            return userAgent;
        throw new common_1.BadRequestException('Cant identify the User Agent of the client');
    }
};
exports.IpUaContextThrottlerGuard = IpUaContextThrottlerGuard;
exports.IpUaContextThrottlerGuard = IpUaContextThrottlerGuard = IpUaContextThrottlerGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object, Object, core_1.Reflector])
], IpUaContextThrottlerGuard);
//# sourceMappingURL=ip-ua-context-custom-throttler.guard.js.map