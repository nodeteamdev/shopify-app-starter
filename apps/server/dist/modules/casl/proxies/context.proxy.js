"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextProxy = void 0;
const common_1 = require("@nestjs/common");
class ContextProxy {
    constructor(context) {
        this.context = context;
    }
    static create(context) {
        return new ContextProxy(context);
    }
    async getRequest() {
        switch (this.context.getType()) {
            case 'http':
            case 'ws':
                return this.context.switchToHttp().getRequest();
            default:
                throw new common_1.NotAcceptableException();
        }
    }
}
exports.ContextProxy = ContextProxy;
//# sourceMappingURL=context.proxy.js.map