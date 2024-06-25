"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateScheme = void 0;
const common_1 = require("@nestjs/common");
const send_error_to_sentry_helper_1 = require("../../modules/common/helpers/send-error-to-sentry.helper");
function validateScheme(scheme, config, logger) {
    try {
        scheme.parse(config);
        logger.log('Config loaded successfully');
    }
    catch (error) {
        logger.error('Config validation failed');
        logger.error(error);
        (0, send_error_to_sentry_helper_1.sendErrorToSentry)(error, { config });
        throw new common_1.InternalServerErrorException(`Environments failed: ${error.message}`);
    }
}
exports.validateScheme = validateScheme;
//# sourceMappingURL=scheme-validator.helper.js.map