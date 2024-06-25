"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class BaseExceptionFilter {
    constructor(defaultMessage, defaultStatus) {
        this.logger = new common_1.Logger(BaseExceptionFilter.name);
        this.defaultMessage = defaultMessage;
        this.defaultStatus = defaultStatus;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const status = exception.getStatus
            ? exception.getStatus()
            : this.defaultStatus;
        const errorMessage = exception?.response?.message || this.defaultMessage;
        let [code, message] = this.defaultMessage.split(':');
        const splittedError = errorMessage.split(':');
        if (splittedError.length === 2) {
            [code, message] = splittedError;
        }
        if (splittedError.length === 1) {
            [message] = splittedError;
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
}
exports.default = BaseExceptionFilter;
//# sourceMappingURL=base-exception.filter.js.map