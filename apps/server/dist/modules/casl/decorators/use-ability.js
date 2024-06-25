"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseAbility = void 0;
const common_1 = require("@nestjs/common");
const casl_constants_1 = require("../casl.constants");
function UseAbility(action, subject, subjectHook) {
    return (0, common_1.SetMetadata)(casl_constants_1.CASL_META_ABILITY, { action, subject, subjectHook });
}
exports.UseAbility = UseAbility;
//# sourceMappingURL=use-ability.js.map