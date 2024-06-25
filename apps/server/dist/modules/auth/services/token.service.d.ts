import { JwtTokensDto } from '@modules/auth/dto/jwt-tokens.dto';
import { AccessRefreshTokens } from '@modules/auth/interfaces/access-refresh-tokens.interface';
import { AuthUser } from '@modules/auth/interfaces/auth-user.interface';
import { TokenRepository } from '@modules/auth/repositories/token.repository';
import { UserRole } from '@modules/auth/types/user-role.type';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RolesEnum } from '@prisma/client';
export declare class TokenService {
    private readonly jwtService;
    private readonly configService;
    private readonly tokenRepository;
    constructor(jwtService: JwtService, configService: ConfigService, tokenRepository: TokenRepository);
    getAccessTokenFromWhitelist(userId: string, sessionId: string): Promise<string>;
    setRefreshToken(id: string, roles: RolesEnum, sessionId: string): Promise<string>;
    setAccessToken(id: string, role: RolesEnum, sessionId: string): Promise<string>;
    setResetPasswordToken(id: string, roles: UserRole[], sessionId: string): Promise<string>;
    setVerifyEmailToken(id: string, roles: UserRole[], sessionId: string): Promise<string>;
    signTokens(userId: string, role: RolesEnum, session?: string): Promise<JwtTokensDto>;
    refreshTokens(refreshToken: string): Promise<AccessRefreshTokens>;
    deleteAuthTokes(userId: string, sessionId: string): Promise<void>;
    deleteAllResetPasswordTokens(userId: string): Promise<void>;
    deleteAllVerifyEmailTokens(userId: string): Promise<void>;
    createResetPasswordToken(id: string, roles: UserRole[]): Promise<string>;
    createVerifyEmailToken(id: string, roles: UserRole[]): Promise<string>;
    verifyResetPasswordToken(resetPasswordToken: string): Promise<AuthUser>;
    verifyVerifyEmailToken(verifyEmailToken: string): Promise<AuthUser>;
}
