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
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_redis_1 = require("@songkeys/nestjs-redis");
const ioredis_1 = require("ioredis");
let RedisService = RedisService_1 = class RedisService {
    constructor(redisClient) {
        this.redisClient = redisClient;
        this.logger = new common_1.Logger(RedisService_1.name);
    }
    isExist(key) {
        return this.redisClient.exists(key);
    }
    getTtl(key) {
        return this.redisClient.ttl(key);
    }
    setExpire(key, seconds) {
        return this.redisClient.expire(key, seconds);
    }
    setOne(key, value) {
        return this.redisClient.set(key, value);
    }
    appendOne(key, value) {
        return this.redisClient.append(key, value);
    }
    getOne(key) {
        return this.redisClient.get(key);
    }
    async setOneWithExpire(key, value, seconds) {
        try {
            await this.setOne(key, value);
            await this.setExpire(key, seconds);
        }
        catch (error) {
            await this.delete(key);
            throw error;
        }
        return 'OK';
    }
    setExpireForMany(keys, seconds) {
        return Promise.all(keys.map((key) => this.setExpire(key, seconds)));
    }
    setMany(keyValues) {
        return this.redisClient.mset(keyValues.flat());
    }
    async setManyWithExpire(keyValues, seconds) {
        try {
            await this.setMany(keyValues);
            await this.setExpireForMany(keyValues.map(([k]) => k), seconds);
        }
        catch (error) {
            this.logger.error(`Error occurred during attempt of setting many with expire: : ${error.message}`, error);
            await this.deleteMany(keyValues.map(([k]) => k));
            throw error;
        }
        return 'OK';
    }
    getMany(keys) {
        return this.redisClient.mget(keys);
    }
    delete(key) {
        return this.redisClient.del(key);
    }
    deleteMany(keys) {
        return this.redisClient.del(keys);
    }
    getKeys(pattern) {
        return this.redisClient.keys(pattern);
    }
    setManyToHashMap(key, hashValues) {
        return this.redisClient.hmset(key, hashValues);
    }
    getManyFromHashMap(key, fields) {
        return this.redisClient.hmget(key, ...fields);
    }
    getHashMapKeys(key) {
        return this.redisClient.hkeys(key);
    }
    deleteHashMapKeys(key, keys) {
        return this.redisClient.del(key, ...keys);
    }
    deleteHashMap(key) {
        return this.redisClient.del(key);
    }
    rpush(key, ...elements) {
        return this.redisClient.rpush(key, ...elements);
    }
    ttl(key) {
        return this.redisClient.ttl(key);
    }
    pexpire(key, milliseconds) {
        return this.redisClient.pexpire(key, milliseconds);
    }
    increment(key) {
        return this.redisClient.incr(key);
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_redis_1.InjectRedis)()),
    __metadata("design:paramtypes", [ioredis_1.Redis])
], RedisService);
//# sourceMappingURL=redis.service.js.map