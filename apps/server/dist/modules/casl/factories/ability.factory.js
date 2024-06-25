"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbilityFactory = exports.nullConditionsMatcher = void 0;
const ability_1 = require("@casl/ability");
const casl_constants_1 = require("../casl.constants");
const permissions_interface_1 = require("../interfaces/permissions.interface");
const common_1 = require("@nestjs/common");
const nullConditionsMatcher = () => () => true;
exports.nullConditionsMatcher = nullConditionsMatcher;
let AbilityFactory = class AbilityFactory {
    constructor(featureOptions) {
        this.featureOptions = featureOptions;
    }
    createForUser(user, abilityClass = ability_1.Ability) {
        const { permissions } = this.featureOptions;
        const ability = new permissions_interface_1.UserAbilityBuilder(user, permissions, abilityClass);
        const everyone = permissions.everyone || permissions.every;
        if (everyone) {
            everyone(ability);
        }
        if (abilityClass === ability_1.PureAbility) {
            return ability.build({ conditionsMatcher: exports.nullConditionsMatcher });
        }
        return ability.build();
    }
};
exports.AbilityFactory = AbilityFactory;
exports.AbilityFactory = AbilityFactory = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(casl_constants_1.CASL_FEATURE_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], AbilityFactory);
//# sourceMappingURL=ability.factory.js.map