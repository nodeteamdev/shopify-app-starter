"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipAuth = exports.IS_SKIP_AUTH_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_SKIP_AUTH_KEY = 'skip-auth';
const SkipAuth = () => (0, common_1.SetMetadata)(exports.IS_SKIP_AUTH_KEY, true);
exports.SkipAuth = SkipAuth;
//# sourceMappingURL=skip-auth.decorator.js.map