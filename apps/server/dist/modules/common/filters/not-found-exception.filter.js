"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const errors_constants_1 = require("../constants/errors.constants");
let NotFoundExceptionFilter = class NotFoundExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const status = exception.getStatus
            ? exception.getStatus()
            : common_1.HttpStatus.NOT_FOUND;
        const exceptionResponse = {
            success: false,
            error: {
                code: parseInt(errors_constants_1.NOT_FOUND.split(':')[0], 10),
                message: errors_constants_1.NOT_FOUND.split(':')[1].trim(),
                details: exception.getResponse(),
            },
        };
        return res.status(status).json(exceptionResponse);
    }
};
exports.NotFoundExceptionFilter = NotFoundExceptionFilter;
exports.NotFoundExceptionFilter = NotFoundExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.NotFoundException)
], NotFoundExceptionFilter);
//# sourceMappingURL=not-found-exception.filter.js.map