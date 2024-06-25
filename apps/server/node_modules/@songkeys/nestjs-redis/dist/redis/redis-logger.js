"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const common_1 = require("@nestjs/common");
const redis_constants_1 = require("./redis.constants");
exports.logger = new common_1.Logger(redis_constants_1.REDIS_MODULE_ID, { timestamp: true });
