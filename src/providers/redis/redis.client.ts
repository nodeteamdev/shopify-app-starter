import Redis, { Redis as RedisType } from 'ioredis';

export default class RedisClient extends Redis implements RedisType {}
