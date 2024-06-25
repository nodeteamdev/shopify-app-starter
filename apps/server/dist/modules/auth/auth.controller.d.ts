import { UserProxy } from '@casl/proxies/user.proxy';
import { ForgotPasswordDto } from '@modules/auth/dto/forgot-password.dto';
import { JwtTokensDto } from '@modules/auth/dto/jwt-tokens.dto';
import { RefreshTokenDto } from '@modules/auth/dto/refresh-token.dto';
import { ResendVerifyEmailDto } from '@modules/auth/dto/resend-verify-email.dto';
import { ResetPasswordDto } from '@modules/auth/dto/reset-password.dto';
import { SignInDto } from '@modules/auth/dto/sign-in.dto';
import { SignUpDto } from '@modules/auth/dto/sign-up.dto';
import { VerifyEmailDto } from '@modules/auth/dto/verify-email.dto';
import { AuthUser } from '@modules/auth/interfaces/auth-user.interface';
import { AuthService } from '@modules/auth/services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(body: SignUpDto): Promise<void>;
    verifyEmail(verifyEmailDto: VerifyEmailDto): Promise<JwtTokensDto>;
    retryEmailVerification(resendVerifyEmailDto: ResendVerifyEmailDto): Promise<void>;
    signIn(data: SignInDto): Promise<JwtTokensDto>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<JwtTokensDto>;
    logout(userProxy: UserProxy<AuthUser>): Promise<void>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<JwtTokensDto>;
}
