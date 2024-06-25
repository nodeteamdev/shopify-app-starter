"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisIoAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const ioredis_1 = __importDefault(require("ioredis"));
class RedisIoAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app, configService) {
        super();
        this.configService = configService;
    }
    async connectToRedis() {
        const redisUrl = new URL(this.configService.get('redis.url'));
        const pubClient = new ioredis_1.default({
            host: redisUrl.hostname,
            port: parseInt(redisUrl.port, 10),
        });
        const subClient = pubClient.duplicate();
        this.adapterConstructor = (0, redis_adapter_1.createAdapter)(pubClient, subClient);
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        server.adapter(this.adapterConstructor);
        return server;
    }
}
exports.RedisIoAdapter = RedisIoAdapter;
//# sourceMappingURL=redis-io.adapter.js.map