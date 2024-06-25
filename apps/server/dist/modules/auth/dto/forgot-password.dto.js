"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sign_up_dto_1 = require("./sign-up.dto");
class ForgotPasswordDto extends (0, swagger_1.PickType)(sign_up_dto_1.SignUpDto, ['email']) {
}
exports.ForgotPasswordDto = ForgotPasswordDto;
//# sourceMappingURL=forgot-password.dto.js.map