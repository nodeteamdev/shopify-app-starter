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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const access_service_1 = require("./access.service");
const casl_config_1 = require("./casl.config");
const casl_constants_1 = require("./casl.constants");
const subject_hook_factory_1 = require("./factories/subject-hook.factory");
const user_hook_factory_1 = require("./factories/user-hook.factory");
const request_proxy_1 = require("./proxies/request.proxy");
const context_proxy_1 = require("./proxies/context.proxy");
let AccessGuard = class AccessGuard {
    constructor(reflector, accessService, moduleRef) {
        this.reflector = reflector;
        this.accessService = accessService;
        this.moduleRef = moduleRef;
    }
    async canActivate(context) {
        const ability = this.reflector.get(casl_constants_1.CASL_META_ABILITY, context.getHandler());
        const request = await context_proxy_1.ContextProxy.create(context).getRequest();
        const { getUserHook } = casl_config_1.CaslConfig.getRootOptions();
        const req = new request_proxy_1.RequestProxy(request);
        req.setUserHook(await (0, user_hook_factory_1.userHookFactory)(this.moduleRef, getUserHook));
        req.setSubjectHook(await (0, subject_hook_factory_1.subjectHookFactory)(this.moduleRef, ability?.subjectHook));
        return this.accessService.canActivateAbility(request, ability);
    }
};
exports.AccessGuard = AccessGuard;
exports.AccessGuard = AccessGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        access_service_1.AccessService,
        core_1.ModuleRef])
], AccessGuard);
//# sourceMappingURL=access.guard.js.map