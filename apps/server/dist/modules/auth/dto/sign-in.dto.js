"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInDto = void 0;
const sign_up_dto_1 = require("./sign-up.dto");
const swagger_1 = require("@nestjs/swagger");
class SignInDto extends (0, swagger_1.PickType)(sign_up_dto_1.SignUpDto, ['email', 'password']) {
}
exports.SignInDto = SignInDto;
//# sourceMappingURL=sign-in.dto.js.map