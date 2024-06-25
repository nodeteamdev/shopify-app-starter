import { ConfigService } from '@nestjs/config';
import { RedisService } from '@providers/redis/redis.service';
export declare class TokenRepository {
    private readonly configService;
    private readonly redisService;
    constructor(configService: ConfigService, redisService: RedisService);
    findToken(key: string): Promise<string | null>;
    findManyTokens(keys: string[]): Promise<(string | null)[]>;
    findTokenKeys(keysPattern: string): Promise<string[]>;
    setRefreshToken(key: string, token: string): Promise<void>;
    setAccessToken(key: string, token: string): Promise<void>;
    setResetPasswordToken(key: string, token: string): Promise<void>;
    setVerifyEmailToken(key: string, token: string): Promise<void>;
    getAllResetPasswordTokenKeysPattern(userId: string): string;
    getAllVerifyEmailTokenKeysPattern(userId: string): string;
    getRefreshTokenKey(userId: string, sessionId: string): string;
    getAccessTokenKey(userId: string, sessionId: string): string;
    getResetPasswordTokenKey(userId: string, sessionId: string): string;
    getVerifyEmailTokenKey(userId: string, sessionId: string): string;
    delete(key: string): Promise<number>;
    deleteMany(keys: string[]): Promise<number>;
}
