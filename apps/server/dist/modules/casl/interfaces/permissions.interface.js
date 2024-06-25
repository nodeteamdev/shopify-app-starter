"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAbilityBuilder = void 0;
const ability_1 = require("@casl/ability");
class UserAbilityBuilder extends ability_1.AbilityBuilder {
    constructor(user, permissions, AbilityType) {
        super(AbilityType);
        this.user = user;
        this.permissions = permissions;
        this.extend = (role) => {
            this.permissionsFor(role);
        };
    }
    permissionsFor(role) {
        const rolePermissions = this.permissions[role];
        if (rolePermissions) {
            rolePermissions(this);
        }
    }
}
exports.UserAbilityBuilder = UserAbilityBuilder;
//# sourceMappingURL=permissions.interface.js.map