"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const common_1 = require("@nestjs/common");
const cluster_constants_1 = require("./cluster.constants");
exports.logger = new common_1.Logger(cluster_constants_1.CLUSTER_MODULE_ID, { timestamp: true });
