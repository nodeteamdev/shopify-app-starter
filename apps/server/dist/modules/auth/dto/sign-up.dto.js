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
exports.SignUpDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const node_envs_enum_1 = require("../../common/enums/node-envs.enum");
const isProduction = process.env.NODE_ENV === node_envs_enum_1.NodeEnvsEnum.PRODUCTION;
class SignUpDto {
}
exports.SignUpDto = SignUpDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: process.env.TEST_EMAIL || 'someemail@gmail.com',
    }),
    (0, class_validator_1.Matches)(isProduction ? /^(?!.*\+).*$/ : /./, {
        message: `Email mustn't contain additional domains`,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 20),
    (0, class_validator_1.Matches)(/[\d\W]/, {
        message: 'password must contain at least one digit and/or special character',
    }),
    (0, class_validator_1.Matches)(/[a-zA-Z]/, { message: 'password must contain at least one letter' }),
    (0, class_validator_1.Matches)(/^\S+$/, { message: 'password must not contain spaces' }),
    (0, swagger_1.ApiProperty)({ type: String, example: 'string!12345' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    (0, swagger_1.ApiProperty)({ type: String, example: 'Alexander' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    (0, swagger_1.ApiProperty)({ type: String, example: 'Reynolds' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "lastName", void 0);
//# sourceMappingURL=sign-up.dto.js.map