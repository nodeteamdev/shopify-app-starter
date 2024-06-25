import { BinaryLike, randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { setTimeout } from 'node:timers/promises';
import { promisify } from 'node:util';
import { EMAIL_IS_VERIFIED, USER_CONFLICT } from '@constants/errors.constants';
import { getRandomTimeInMilliseconds } from '@helpers/get-random-time-in-milliseconds.helper';
import { ForgotPasswordDto } from '@modules/auth/dto/forgot-password.dto';
import { JwtTokensDto } from '@modules/auth/dto/jwt-tokens.dto';
import { ResendVerifyEmailDto } from '@modules/auth/dto/resend-verify-email.dto';
import { ResetPasswordDto } from '@modules/auth/dto/reset-password.dto';
import { SignInDto } from '@modules/auth/dto/sign-in.dto';
import { SignUpDto } from '@modules/auth/dto/sign-up.dto';
import { VerifyEmailDto } from '@modules/auth/dto/verify-email.dto';
import { AccessRefreshTokens } from '@modules/auth/interfaces/access-refresh-tokens.interface';
import { AuthUser } from '@modules/auth/interfaces/auth-user.interface';
import { TokenService } from '@modules/auth/services/token.service';
import { EmailService } from '@modules/email/email.service';
import { UserService } from '@modules/user/user.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';

const scryptPromise: (
  password: BinaryLike,
  salt: BinaryLike,
  keylen: number,
) => Promise<Buffer> = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService,
  ) {}

  private static async hashPassword(
    password: string,
  ): Promise<`${string}:${string}`> {
    const salt = randomBytes(16).toString('hex');
    const buffer: Buffer = await scryptPromise(password, salt, 64);

    return `${salt}:${buffer.toString('hex')}`;
  }

  private static async isPasswordCorrect(
    passwordToCheck: string,
    validPassword: `${string}:${string}`,
  ) {
    const [salt, key] = validPassword.split(':');
    const validBuffer: Buffer = Buffer.from(key, 'hex');

    const hashedBufferToCheck: Buffer = await scryptPromise(
      passwordToCheck,
      salt,
      64,
    );

    return timingSafeEqual(hashedBufferToCheck, validBuffer);
  }

  public async signUp(signUpDto: SignUpDto): Promise<void> {
    const user: User | null = await this.userService.findByEmail(
      signUpDto.email,
    );

    if (user) {
      throw new ConflictException(USER_CONFLICT);
    }

    const newUser: User = await this.userService.create({
      email: signUpDto.email,
      firstName: signUpDto.firstName,
      lastName: signUpDto.lastName,
      password: await AuthService.hashPassword(signUpDto.password),
    });

    await this.startEmailVerification(newUser);
  }

  public async verifyEmail(
    verifyEmailDto: VerifyEmailDto,
  ): Promise<JwtTokensDto> {
    const { token } = verifyEmailDto;

    const user: AuthUser =
      await this.tokenService.verifyVerifyEmailToken(token);

    await this.userService.update(user.id, {
      isEmailVerified: true,
    });

    await this.tokenService.deleteAllVerifyEmailTokens(user.id);

    return this.tokenService.signTokens(user.id, user.role, user.sessionId);
  }

  public async retryEmailVerification(
    resendVerifyEmailDto: ResendVerifyEmailDto,
  ): Promise<void> {
    const { email } = resendVerifyEmailDto;

    const user: User | null = await this.userService.findByEmail(email);

    if (!user) {
      const millisecondsToWait: number = getRandomTimeInMilliseconds(1, 4);

      return await setTimeout(millisecondsToWait);
    }

    if (user.isEmailVerified) {
      throw new BadRequestException(EMAIL_IS_VERIFIED);
    }

    await this.startEmailVerification(user);
  }

  public async startEmailVerification(user: User): Promise<void> {
    await this.tokenService.deleteAllVerifyEmailTokens(user.id);

    const verifyEmailToken: string =
      await this.tokenService.createVerifyEmailToken(user.id, [user.role]);

    await this.emailService.sendEmailVerificationEmail(
      user.email,
      verifyEmailToken,
    );
  }

  public async signIn(signInDto: SignInDto): Promise<AccessRefreshTokens> {
    const { email, password } = signInDto;

    const user: User = await this.userService.findByEmail(email);

    if (!user || !user.password) {
      throw new UnauthorizedException();
    }

    const isValid: boolean = await AuthService.isPasswordCorrect(
      password,
      user.password as `${string}:${string}`,
    );

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return this.tokenService.signTokens(user.id, user.role);
  }

  public refreshTokens(refreshToken: string): Promise<AccessRefreshTokens> {
    return this.tokenService.refreshTokens(refreshToken);
  }

  public logout(userId: string, sessionId: string): Promise<void> {
    return this.tokenService.deleteAuthTokes(userId, sessionId);
  }

  public async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void> {
    const { email } = forgotPasswordDto;

    const user: User | null = await this.userService.findByEmail(email);

    if (!user) {
      const millisecondsToWait: number = getRandomTimeInMilliseconds(1, 4);

      return await setTimeout(millisecondsToWait);
    }

    await this.tokenService.deleteAllResetPasswordTokens(user.id);

    const resetPasswordToken: string =
      await this.tokenService.createResetPasswordToken(user.id, [user.role]);

    await this.emailService.sendResetPasswordEmail(email, resetPasswordToken);
  }

  public async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<JwtTokensDto> {
    const { password, token } = resetPasswordDto;

    const user: AuthUser =
      await this.tokenService.verifyResetPasswordToken(token);

    const hashedPassword = await AuthService.hashPassword(password);

    await this.userService.update(user.id, {
      password: hashedPassword,
    });

    await this.tokenService.deleteAllResetPasswordTokens(user.id);

    return this.tokenService.signTokens(user.id, user.role, user.sessionId);
  }
}
