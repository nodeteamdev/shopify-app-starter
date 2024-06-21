import { JwtConfig } from '@config/jwt.config';
import { IS_SKIP_AUTH_KEY } from '@modules/auth/decorators/skip-auth.decorator';
import { TokenService } from '@modules/auth/services/token.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(
      IS_SKIP_AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isSkipAuth) {
      return true;
    }

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const {
        access: { secret },
      } = this.configService.get<JwtConfig>('jwt');

      const payload = await this.jwtService.verifyAsync(token, {
        secret,
      });

      const whitelistedToken =
        await this.tokenService.getAccessTokenFromWhitelist(
          payload.id,
          payload.sessionId,
        );

      if (whitelistedToken !== token) {
        throw new UnauthorizedException();
      }

      request.user = payload;
      request.user._meta = {
        accessToken: token,
      };
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  /**
   * @desc Extract token from header
   * @param request Request
   * @returns string | undefined
   * @private
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
