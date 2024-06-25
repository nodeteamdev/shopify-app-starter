"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendVerifyEmailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sign_up_dto_1 = require("./sign-up.dto");
class ResendVerifyEmailDto extends (0, swagger_1.PickType)(sign_up_dto_1.SignUpDto, ['email']) {
}
exports.ResendVerifyEmailDto = ResendVerifyEmailDto;
//# sourceMappingURL=resend-verify-email.dto.js.map