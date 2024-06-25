"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPermissions = void 0;
const tokens_entity_1 = require("./entities/tokens.entity");
const casl_1 = require("../casl");
exports.authPermissions = {
    everyone({ can }) {
        can(casl_1.Actions.delete, tokens_entity_1.TokensEntity);
    },
};
//# sourceMappingURL=auth.permissions.js.map