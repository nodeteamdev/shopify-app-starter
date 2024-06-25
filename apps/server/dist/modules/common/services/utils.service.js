"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    static parseLogLevel(level) {
        if (!level) {
            return ['log', 'error', 'warn', 'debug', 'verbose'];
        }
        if (level === 'none') {
            return [];
        }
        return level.split(',');
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.service.js.map