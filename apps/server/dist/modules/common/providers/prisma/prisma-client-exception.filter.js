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
exports.PrismaClientExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const client_1 = require("@prisma/client");
const errors_constants_1 = require("../../constants/errors.constants");
let PrismaClientExceptionFilter = class PrismaClientExceptionFilter extends core_1.BaseExceptionFilter {
    constructor(applicationRef, errorCodesStatusMapping) {
        super(applicationRef);
        this.errorCodesStatusMapping = {
            P2000: common_1.HttpStatus.BAD_REQUEST,
            P2002: common_1.HttpStatus.CONFLICT,
            P2003: common_1.HttpStatus.CONFLICT,
            P2025: common_1.HttpStatus.NOT_FOUND,
        };
        if (errorCodesStatusMapping) {
            this.errorCodesStatusMapping = Object.assign(this.errorCodesStatusMapping, errorCodesStatusMapping);
        }
    }
    catch(exception, host) {
        if (exception instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            return this.catchClientKnownRequestError(exception, host);
        }
        if (exception instanceof client_1.Prisma.NotFoundError) {
            return this.catchNotFoundError(exception, host);
        }
    }
    catchClientKnownRequestError(exception, host) {
        const statusCode = this.errorCodesStatusMapping[exception.code];
        const message = this.exceptionShortMessage(exception.message);
        if (!Object.keys(this.errorCodesStatusMapping).includes(exception.code)) {
            return super.catch(exception, host);
        }
        const [code] = errors_constants_1.PRISMA_API_ERROR.split(':');
        super.catch(new common_1.HttpException({
            success: false,
            error: {
                details: exception.code,
                message,
                code: parseInt(code, 10),
            },
        }, statusCode), host);
    }
    catchNotFoundError({ message }, host) {
        const statusCode = common_1.HttpStatus.NOT_FOUND;
        const [prismaCode, msg] = message.split(':');
        const [code] = errors_constants_1.PRISMA_API_ERROR.split(':');
        super.catch(new common_1.HttpException({
            success: false,
            error: {
                details: prismaCode,
                message: msg.trim(),
                code: parseInt(code, 10),
            },
        }, statusCode), host);
    }
    exceptionShortMessage(message) {
        const shortMessage = message.substring(message.indexOf('→'));
        return shortMessage
            .substring(shortMessage.indexOf('\n'))
            .replace(/\n/g, '')
            .trim();
    }
};
exports.PrismaClientExceptionFilter = PrismaClientExceptionFilter;
exports.PrismaClientExceptionFilter = PrismaClientExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma?.PrismaClientKnownRequestError, client_1.Prisma?.NotFoundError),
    __metadata("design:paramtypes", [Object, Object])
], PrismaClientExceptionFilter);
//# sourceMappingURL=prisma-client-exception.filter.js.map