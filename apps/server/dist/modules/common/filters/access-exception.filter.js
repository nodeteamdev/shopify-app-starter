"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessExceptionFilter = void 0;
const errors_constants_1 = require("../constants/errors.constants");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let AccessExceptionFilter = class AccessExceptionFilter extends core_1.BaseExceptionFilter {
    catch(exception, host) {
        if (exception instanceof common_1.UnauthorizedException) {
            return this.catchUnauthorizedException(exception, host);
        }
        if (exception instanceof common_1.ForbiddenException) {
            return this.catchForbiddenException(exception, host);
        }
    }
    catchUnauthorizedException(exception, host) {
        const statusCode = exception.getStatus() || common_1.HttpStatus.UNAUTHORIZED;
        const exceptionResponse = exception?.getResponse();
        const details = exceptionResponse instanceof Object
            ? exceptionResponse
            : null;
        const [serverErrorCode] = errors_constants_1.UNAUTHORIZED_RESOURCE.split(':');
        super.catch(new common_1.HttpException({
            success: false,
            error: {
                code: parseInt(serverErrorCode, 10),
                message: exception.message,
                details: details?.error,
            },
        }, statusCode), host);
        common_1.Logger.error(exception, 'UnauthorizedExceptionFilter');
    }
    catchForbiddenException(exception, host) {
        const statusCode = exception.getStatus() || common_1.HttpStatus.FORBIDDEN;
        const exceptionResponse = exception?.getResponse();
        const details = exceptionResponse instanceof Object
            ? exceptionResponse
            : null;
        const [serverErrorCode] = errors_constants_1.FORBIDDEN_RESOURCE.split(':');
        super.catch(new common_1.HttpException({
            success: false,
            error: {
                code: parseInt(serverErrorCode, 10),
                message: exception.message,
                details: details?.error,
            },
        }, statusCode), host);
        common_1.Logger.error(exception, 'ForbiddenExceptionFilter');
    }
};
exports.AccessExceptionFilter = AccessExceptionFilter;
exports.AccessExceptionFilter = AccessExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.UnauthorizedException, common_1.ForbiddenException)
], AccessExceptionFilter);
//# sourceMappingURL=access-exception.filter.js.map