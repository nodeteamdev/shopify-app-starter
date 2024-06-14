import { UserProxy } from '@casl/proxies/user.proxy';
import {
  ApiBadRequestBaseResponse,
  ApiForbiddenBaseResponse,
  ApiInternalServerErrorBaseResponse,
  ApiUnauthorizedBaseResponse,
} from '@decorators/api-base-responses.decorator';
import { ApiCreatedBaseResponse } from '@decorators/api-ok-base-response.decorator';
import { Serialize } from '@decorators/serialize.decorator';
import { TransformInterceptor } from '@interceptors/transform.interceptor';
import { SkipAuth } from '@modules/auth/decorators/skip-auth.decorator';
import { ForgotPasswordDto } from '@modules/auth/dto/forgot-password.dto';
import { JwtTokensDto } from '@modules/auth/dto/jwt-tokens.dto';
import { RefreshTokenDto } from '@modules/auth/dto/refresh-token.dto';
import { ResendVerifyEmailDto } from '@modules/auth/dto/resend-verify-email.dto';
import { ResetPasswordDto } from '@modules/auth/dto/reset-password.dto';
import { SignInDto } from '@modules/auth/dto/sign-in.dto';
import { SignUpDto } from '@modules/auth/dto/sign-up.dto';
import { VerifyEmailDto } from '@modules/auth/dto/verify-email.dto';
import { TokensEntity } from '@modules/auth/entities/tokens.entity';
import { AuthUser } from '@modules/auth/interfaces/auth-user.interface';
import { AuthService } from '@modules/auth/services/auth.service';
import { AccessGuard, Actions, CaslUser, UseAbility } from '@modules/casl';
import { IpUaContextThrottlerGuard } from '@modules/common/guards/ip-ua-context-custom-throttler.guard';
import {
  Body,
  Controller,
  HttpCode,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Auth')
@ApiInternalServerErrorBaseResponse()
@ApiBadRequestBaseResponse()
@UseInterceptors(TransformInterceptor)
@UseGuards(IpUaContextThrottlerGuard)
@ApiExtraModels(JwtTokensDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @ApiCreatedBaseResponse()
  @Serialize(JwtTokensDto)
  @Post('sign-up')
  public signUp(@Body() body: SignUpDto): Promise<void> {
    return this.authService.signUp(body);
  }

  @SkipAuth()
  @Throttle({ default: { limit: 3, ttl: 60 } })
  @ApiOkResponse({ type: JwtTokensDto })
  @ApiUnauthorizedBaseResponse()
  @ApiForbiddenBaseResponse()
  @ApiBadRequestBaseResponse()
  @ApiBody({ type: VerifyEmailDto })
  @Patch('verify-email')
  public verifyEmail(
    @Body() verifyEmailDto: VerifyEmailDto,
  ): Promise<JwtTokensDto> {
    return this.authService.verifyEmail(verifyEmailDto);
  }

  @SkipAuth()
  @Throttle({ default: { limit: 3, ttl: 60 } })
  @ApiCreatedBaseResponse()
  @ApiBadRequestBaseResponse()
  @ApiBody({ type: ResendVerifyEmailDto })
  @Patch('retry-email-verification')
  public async retryEmailVerification(
    @Body() resendVerifyEmailDto: ResendVerifyEmailDto,
  ): Promise<void> {
    return this.authService.retryEmailVerification(resendVerifyEmailDto);
  }

  @SkipAuth()
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @ApiCreatedBaseResponse({ dto: JwtTokensDto })
  @Serialize(JwtTokensDto)
  @ApiUnauthorizedBaseResponse()
  @Post('sign-in')
  public signIn(@Body() data: SignInDto): Promise<JwtTokensDto> {
    return this.authService.signIn(data);
  }

  @SkipAuth()
  @Throttle({ default: { limit: 2, ttl: 60 * 60 } })
  @ApiCreatedBaseResponse({ dto: JwtTokensDto })
  @ApiForbiddenBaseResponse()
  @ApiUnauthorizedBaseResponse()
  @Post('refresh-tokens')
  public refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<JwtTokensDto> {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @Throttle({ default: { limit: 2, ttl: 60 } })
  @ApiUnauthorizedBaseResponse()
  @ApiBearerAuth()
  @HttpCode(204)
  @Post('logout')
  @UseGuards(AccessGuard)
  @UseAbility(Actions.delete, TokensEntity)
  public async logout(
    @CaslUser() userProxy: UserProxy<AuthUser>,
  ): Promise<void> {
    const user: AuthUser = await userProxy.get();

    return this.authService.logout(user.id, user.sessionId);
  }

  @SkipAuth()
  @Throttle({ default: { limit: 3, ttl: 60 } })
  @ApiCreatedBaseResponse()
  @ApiBadRequestBaseResponse()
  @ApiBody({ type: ForgotPasswordDto })
  @Patch('forgot-password')
  public forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @SkipAuth()
  @Throttle({ default: { limit: 3, ttl: 60 } })
  @ApiOkResponse({ type: JwtTokensDto })
  @ApiUnauthorizedBaseResponse()
  @ApiForbiddenBaseResponse()
  @ApiBadRequestBaseResponse()
  @ApiBody({ type: ResetPasswordDto })
  @Patch('reset-password')
  public resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<JwtTokensDto> {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
