"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const errors_constants_1 = require("../constants/errors.constants");
const validation_exception_1 = require("./validation.exception");
let ValidationExceptionFilter = class ValidationExceptionFilter {
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const [code, message] = errors_constants_1.VALIDATION_ERROR.split(':');
        return response.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({
            success: false,
            error: {
                code: parseInt(code, 10),
                message: message.trim(),
                details: exception.validationErrors,
            },
        });
    }
};
exports.ValidationExceptionFilter = ValidationExceptionFilter;
exports.ValidationExceptionFilter = ValidationExceptionFilter = __decorate([
    (0, common_1.Catch)(validation_exception_1.ValidationException)
], ValidationExceptionFilter);
//# sourceMappingURL=validation-exception.filter.js.map