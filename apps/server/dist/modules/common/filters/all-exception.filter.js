"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var AllExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const errors_constants_1 = require("../constants/errors.constants");
const common_1 = require("@nestjs/common");
const Sentry = __importStar(require("@sentry/node"));
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    constructor() {
        this.logger = new common_1.Logger(AllExceptionsFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const status = exception.getStatus
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (status >= 500) {
            Sentry.withScope((scope) => {
                const { referer } = ctx.getRequest().headers;
                const userId = ctx.getRequest() && ctx.getRequest().user
                    ? ctx.getRequest().user.id
                    : undefined;
                if (referer) {
                    scope.setTag('referer', referer);
                }
                if (userId) {
                    scope.setUser({ id: userId });
                }
                scope.addEventProcessor((event) => {
                    return Sentry.Handlers.parseRequest(event, ctx.getRequest());
                });
                return Sentry.captureException(exception);
            });
        }
        const errorMessage = exception?.response?.message || errors_constants_1.INTERNAL_SERVER_ERROR;
        const [code, message] = errorMessage.split(':');
        if (!message) {
            const [serverErrorCode] = errors_constants_1.INTERNAL_SERVER_ERROR.split(':');
            const exceptionResponse = {
                success: false,
                error: {
                    code: parseInt(serverErrorCode, 10),
                    message: errorMessage?.trim() || errors_constants_1.INTERNAL_SERVER_ERROR,
                    details: exception?.response?.error,
                },
            };
            this.logger.error(exception);
            this.logger.error(exception.stack);
            return res.status(status).json(exceptionResponse);
        }
        const exceptionResponse = {
            success: false,
            error: {
                code: parseInt(code, 10),
                message: message?.trim(),
                details: exception?.response?.error,
            },
        };
        this.logger.error(exception);
        this.logger.error(exception.stack);
        return res.status(status).json(exceptionResponse);
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=all-exception.filter.js.map