"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaslConfig = void 0;
const casl_constants_1 = require("./casl.constants");
class CaslConfig {
    static getRootOptions() {
        const rootOptions = (Reflect.getMetadata(casl_constants_1.CASL_ROOT_OPTIONS, CaslConfig) ||
            {});
        if (!rootOptions.getUserFromRequest) {
            return {
                ...rootOptions,
                getUserFromRequest: (request) => request.user,
            };
        }
        return rootOptions;
    }
}
exports.CaslConfig = CaslConfig;
//# sourceMappingURL=casl.config.js.map