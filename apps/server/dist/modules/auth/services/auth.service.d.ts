import { ForgotPasswordDto } from '@modules/auth/dto/forgot-password.dto';
import { JwtTokensDto } from '@modules/auth/dto/jwt-tokens.dto';
import { ResendVerifyEmailDto } from '@modules/auth/dto/resend-verify-email.dto';
import { ResetPasswordDto } from '@modules/auth/dto/reset-password.dto';
import { SignInDto } from '@modules/auth/dto/sign-in.dto';
import { SignUpDto } from '@modules/auth/dto/sign-up.dto';
import { VerifyEmailDto } from '@modules/auth/dto/verify-email.dto';
import { AccessRefreshTokens } from '@modules/auth/interfaces/access-refresh-tokens.interface';
import { TokenService } from '@modules/auth/services/token.service';
import { EmailService } from '@modules/email/email.service';
import { UserService } from '@modules/user/user.service';
import { User } from '@prisma/client';
export declare class AuthService {
    private readonly userService;
    private readonly tokenService;
    private readonly emailService;
    constructor(userService: UserService, tokenService: TokenService, emailService: EmailService);
    private static hashPassword;
    private static isPasswordCorrect;
    signUp(signUpDto: SignUpDto): Promise<void>;
    verifyEmail(verifyEmailDto: VerifyEmailDto): Promise<JwtTokensDto>;
    retryEmailVerification(resendVerifyEmailDto: ResendVerifyEmailDto): Promise<void>;
    startEmailVerification(user: User): Promise<void>;
    signIn(signInDto: SignInDto): Promise<AccessRefreshTokens>;
    refreshTokens(refreshToken: string): Promise<AccessRefreshTokens>;
    logout(userId: string, sessionId: string): Promise<void>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<JwtTokensDto>;
}
