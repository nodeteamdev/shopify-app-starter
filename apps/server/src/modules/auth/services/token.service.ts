import { randomUUID } from 'node:crypto';
import { JwtConfig } from '@config/jwt.config';
import { JwtTokensDto } from '@modules/auth/dto/jwt-tokens.dto';
import { AccessRefreshTokens } from '@modules/auth/interfaces/access-refresh-tokens.interface';
import { AuthUser } from '@modules/auth/interfaces/auth-user.interface';
import { TokenRepository } from '@modules/auth/repositories/token.repository';
import { UserRole } from '@modules/auth/types/user-role.type';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RolesEnum } from '@prisma/client';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  public async getAccessTokenFromWhitelist(userId: string, sessionId: string) {
    const key = this.tokenRepository.getAccessTokenKey(userId, sessionId);

    return this.tokenRepository.findToken(key);
  }

  public async setRefreshToken(
    id: string,
    roles: RolesEnum,
    sessionId: string,
  ): Promise<string> {
    const {
      refresh: { secret, expTime },
    } = this.configService.get<JwtConfig>('jwt');

    const refreshToken = await this.jwtService.signAsync(
      { id, roles, sessionId },
      {
        expiresIn: expTime.seconds,
        secret,
      },
    );

    const key = this.tokenRepository.getRefreshTokenKey(id, sessionId);

    await this.tokenRepository.setRefreshToken(key, refreshToken);

    return refreshToken;
  }

  public async setAccessToken(
    id: string,
    role: RolesEnum,
    sessionId: string,
  ): Promise<string> {
    const {
      access: { secret, expTime },
    } = this.configService.get<JwtConfig>('jwt');

    const accessToken = await this.jwtService.signAsync(
      { id, role, sessionId },
      {
        expiresIn: expTime.seconds,
        secret,
      },
    );

    const key = this.tokenRepository.getAccessTokenKey(id, sessionId);

    await this.tokenRepository.setAccessToken(key, accessToken);

    return accessToken;
  }

  public async setResetPasswordToken(
    id: string,
    roles: UserRole[],
    sessionId: string,
  ): Promise<string> {
    const {
      resetPassword: { secret, expTime },
    } = this.configService.get<JwtConfig>('jwt');

    const resetPasswordToken = await this.jwtService.signAsync(
      { id, roles, sessionId },
      {
        expiresIn: expTime.seconds,
        secret,
      },
    );

    const key = this.tokenRepository.getResetPasswordTokenKey(id, sessionId);

    await this.tokenRepository.setResetPasswordToken(key, resetPasswordToken);

    return resetPasswordToken;
  }

  public async setVerifyEmailToken(
    id: string,
    roles: UserRole[],
    sessionId: string,
  ): Promise<string> {
    const {
      verifyEmail: { secret, expTime },
    } = this.configService.get<JwtConfig>('jwt');

    const verifyEmailToken = await this.jwtService.signAsync(
      { id, roles, sessionId },
      {
        expiresIn: expTime.seconds,
        secret,
      },
    );

    const key = this.tokenRepository.getVerifyEmailTokenKey(id, sessionId);

    await this.tokenRepository.setVerifyEmailToken(key, verifyEmailToken);

    return verifyEmailToken;
  }

  public async signTokens(
    userId: string,
    role: RolesEnum,
    session?: string,
  ): Promise<JwtTokensDto> {
    const now = Date.now();
    const sessionId = session || `${randomUUID()};${now}`;

    const [accessToken, refreshToken] = await Promise.all([
      this.setAccessToken(userId, role, sessionId),
      this.setRefreshToken(userId, role, sessionId),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async refreshTokens(
    refreshToken: string,
  ): Promise<AccessRefreshTokens> {
    const {
      refresh: { secret },
    } = this.configService.get<JwtConfig>('jwt');

    let payload: AuthUser = null;

    try {
      payload = await this.jwtService.verifyAsync<AuthUser>(refreshToken, {
        secret,
      });
    } catch (_error) {
      throw new ForbiddenException('Incorrect token');
    }

    if (!payload) {
      throw new ForbiddenException('Incorrect token');
    }

    const refreshTokenKey = this.tokenRepository.getRefreshTokenKey(
      payload.id,
      payload.sessionId,
    );

    const findRefreshToken =
      await this.tokenRepository.findToken(refreshTokenKey);

    if (!findRefreshToken || findRefreshToken !== refreshToken) {
      throw new ForbiddenException('Incorrect token');
    }

    return this.signTokens(payload.id, payload.role, payload.sessionId);
  }

  public async deleteAuthTokes(
    userId: string,
    sessionId: string,
  ): Promise<void> {
    const accessTokenKey = this.tokenRepository.getAccessTokenKey(
      userId,
      sessionId,
    );

    const refreshTokenKey = this.tokenRepository.getRefreshTokenKey(
      userId,
      sessionId,
    );

    await this.tokenRepository.deleteMany([accessTokenKey, refreshTokenKey]);
  }

  public async deleteAllResetPasswordTokens(userId: string): Promise<void> {
    const resetPasswordTokenKeysPattern: string =
      this.tokenRepository.getAllResetPasswordTokenKeysPattern(userId);

    const resetPasswordTokenKeys: string[] =
      await this.tokenRepository.findTokenKeys(resetPasswordTokenKeysPattern);

    if (resetPasswordTokenKeys.length > 0) {
      await this.tokenRepository.deleteMany(resetPasswordTokenKeys);
    }
  }

  public async deleteAllVerifyEmailTokens(userId: string): Promise<void> {
    const verifyEmailTokenKeysPattern: string =
      this.tokenRepository.getAllVerifyEmailTokenKeysPattern(userId);

    const verifyEmailTokenKeys: string[] =
      await this.tokenRepository.findTokenKeys(verifyEmailTokenKeysPattern);

    if (verifyEmailTokenKeys.length > 0) {
      await this.tokenRepository.deleteMany(verifyEmailTokenKeys);
    }
  }

  public createResetPasswordToken(
    id: string,
    roles: UserRole[],
  ): Promise<string> {
    const now = Date.now();
    const sessionId = `${randomUUID()};${now}`;

    return this.setResetPasswordToken(id, roles, sessionId);
  }

  public createVerifyEmailToken(
    id: string,
    roles: UserRole[],
  ): Promise<string> {
    const now = Date.now();
    const sessionId = `${randomUUID()};${now}`;

    return this.setVerifyEmailToken(id, roles, sessionId);
  }

  public async verifyResetPasswordToken(
    resetPasswordToken: string,
  ): Promise<AuthUser> {
    const {
      resetPassword: { secret },
    } = this.configService.get<JwtConfig>('jwt');

    let payload: AuthUser = null;

    try {
      payload = await this.jwtService.verifyAsync<AuthUser>(
        resetPasswordToken,
        {
          secret,
        },
      );
    } catch (_error) {
      throw new ForbiddenException('Incorrect token');
    }

    if (!payload) {
      throw new ForbiddenException('Incorrect token');
    }

    const resetPasswordTokenKey: string =
      this.tokenRepository.getResetPasswordTokenKey(
        payload.id,
        payload.sessionId,
      );

    const findResetPasswordToken: string = await this.tokenRepository.findToken(
      resetPasswordTokenKey,
    );

    if (
      !findResetPasswordToken ||
      findResetPasswordToken !== resetPasswordToken
    ) {
      throw new ForbiddenException('Incorrect token');
    }

    return payload;
  }

  public async verifyVerifyEmailToken(
    verifyEmailToken: string,
  ): Promise<AuthUser> {
    const {
      verifyEmail: { secret },
    } = this.configService.get<JwtConfig>('jwt');

    let payload: AuthUser = null;

    try {
      payload = await this.jwtService.verifyAsync<AuthUser>(verifyEmailToken, {
        secret,
      });
    } catch (_error) {
      throw new ForbiddenException('Incorrect token');
    }

    if (!payload) {
      throw new ForbiddenException('Incorrect token');
    }

    const verifyEmailTokenKey: string =
      this.tokenRepository.getVerifyEmailTokenKey(
        payload.id,
        payload.sessionId,
      );

    const findVerifyEmailToken: string =
      await this.tokenRepository.findToken(verifyEmailTokenKey);

    if (!findVerifyEmailToken || findVerifyEmailToken !== verifyEmailToken) {
      throw new ForbiddenException('Incorrect token');
    }

    return payload;
  }
}
