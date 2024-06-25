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
exports.UserService = void 0;
const node_crypto_1 = require("node:crypto");
const user_repository_1 = require("./user.repository");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async find(id) {
        return this.userRepository.find(id);
    }
    async findByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
    create(data) {
        return this.userRepository.create({
            id: (0, node_crypto_1.randomUUID)(),
            ...data,
            role: client_1.RolesEnum.CUSTOMER,
        });
    }
    update(id, data) {
        return this.userRepository.update(id, data);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map