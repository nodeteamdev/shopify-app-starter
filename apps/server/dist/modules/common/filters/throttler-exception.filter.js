"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ThrottlerExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrottlerExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const errors_constants_1 = require("../constants/errors.constants");
const throttler_1 = require("@nestjs/throttler");
let ThrottlerExceptionsFilter = ThrottlerExceptionsFilter_1 = class ThrottlerExceptionsFilter {
    constructor() {
        this.logger = new common_1.Logger(ThrottlerExceptionsFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const [code, message] = errors_constants_1.RATE_LIMIT_EXCEEDED.split(':');
        const exceptionResponse = {
            success: false,
            error: {
                code: parseInt(code, 10),
                message: message?.trim(),
                details: exception?.getResponse(),
            },
        };
        this.logger.error(exception);
        return res.status(common_1.HttpStatus.TOO_MANY_REQUESTS).json(exceptionResponse);
    }
};
exports.ThrottlerExceptionsFilter = ThrottlerExceptionsFilter;
exports.ThrottlerExceptionsFilter = ThrottlerExceptionsFilter = ThrottlerExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)(throttler_1.ThrottlerException)
], ThrottlerExceptionsFilter);
//# sourceMappingURL=throttler-exception.filter.js.map