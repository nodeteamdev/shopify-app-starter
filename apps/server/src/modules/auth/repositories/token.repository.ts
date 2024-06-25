import { JwtConfig } from '@config/jwt.config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@providers/redis/redis.service';

@Injectable()
export class TokenRepository {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  public findToken(key: string): Promise<string | null> {
    return this.redisService.getOne(key);
  }

  public findManyTokens(keys: string[]): Promise<(string | null)[]> {
    return this.redisService.getMany(keys);
  }

  public findTokenKeys(keysPattern: string): Promise<string[]> {
    return this.redisService.getKeys(keysPattern);
  }

  public async setRefreshToken(key: string, token: string): Promise<void> {
    const {
      refresh: {
        expTime: { seconds },
      },
    } = this.configService.get<JwtConfig>('jwt');

    await this.redisService.setOneWithExpire(key, token, seconds);
  }

  public async setAccessToken(key: string, token: string): Promise<void> {
    const {
      access: {
        expTime: { seconds },
      },
    } = this.configService.get<JwtConfig>('jwt');

    await this.redisService.setOneWithExpire(key, token, seconds);
  }

  public async setResetPasswordToken(
    key: string,
    token: string,
  ): Promise<void> {
    const {
      resetPassword: {
        expTime: { seconds },
      },
    } = this.configService.get<JwtConfig>('jwt');

    await this.redisService.setOneWithExpire(key, token, seconds);
  }

  public async setVerifyEmailToken(key: string, token: string): Promise<void> {
    const {
      verifyEmail: {
        expTime: { seconds },
      },
    } = this.configService.get<JwtConfig>('jwt');

    await this.redisService.setOneWithExpire(key, token, seconds);
  }

  public getAllResetPasswordTokenKeysPattern(userId: string): string {
    return `USERS;${userId};SESSIONS;*;*;RESET_PASSWORD_TOKEN`;
  }

  public getAllVerifyEmailTokenKeysPattern(userId: string): string {
    return `USERS;${userId};SESSIONS;*;*;VERIFY_EMAIL_TOKEN`;
  }

  public getRefreshTokenKey(userId: string, sessionId: string): string {
    return `USERS;${userId};SESSIONS;${sessionId};REFRESH_TOKEN`;
  }

  public getAccessTokenKey(userId: string, sessionId: string): string {
    return `USERS;${userId};SESSIONS;${sessionId};ACCESS_TOKEN`;
  }

  public getResetPasswordTokenKey(userId: string, sessionId: string): string {
    return `USERS;${userId};SESSIONS;${sessionId};RESET_PASSWORD_TOKEN`;
  }

  public getVerifyEmailTokenKey(userId: string, sessionId: string): string {
    return `USERS;${userId};SESSIONS;${sessionId};VERIFY_EMAIL_TOKEN`;
  }

  public delete(key: string): Promise<number> {
    return this.redisService.delete(key);
  }

  public deleteMany(keys: string[]): Promise<number> {
    return this.redisService.deleteMany(keys);
  }
}
