import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ThrottlerException,
  ThrottlerGuard,
  ThrottlerModuleOptions,
  ThrottlerStorage,
} from '@nestjs/throttler';
import { Request } from 'express';
import { md5 } from '@nestjs/throttler/dist/hash';

@Injectable()
export class IpUaContextThrottlerGuard extends ThrottlerGuard {
  private readonly logger: Logger = new Logger(IpUaContextThrottlerGuard.name);

  constructor(
    readonly options: ThrottlerModuleOptions,
    readonly storageService: ThrottlerStorage,
    readonly reflector: Reflector,
  ) {
    super(options, storageService, reflector);
  }

  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const ip: string = this.getIP(request);
    const userAgent = this.getUserAgent(request);

    // TODO: before going into prod check the IP of the load balancer
    this.logger.debug(`IP of the client: ${ip}`);
    this.logger.debug(`User Agent of the client: ${userAgent}`);

    const suffix = `${ip}:${userAgent}`;

    const key = this.generateKey(context, suffix);

    this.logger.debug(`TTL: ${ttl}, LIMIT: ${limit}`);

    const { totalHits } = await this.storageService.increment(key, ttl);

    if (totalHits > limit) {
      throw new ThrottlerException();
    }

    return true;
  }

  protected generateKey(context: ExecutionContext, suffix: string): string {
    const prefix = `${context.getClass().name}-${context.getHandler().name}`;
    return md5(`${prefix}-${suffix}`);
  }

  private getIP(request: Request): string {
    const ip =
      request.get('x-forwarded-for') ||
      request.socket.remoteAddress ||
      request.ip;

    if (ip) return ip;

    throw new BadRequestException('Cant identify the IP address of the client');
  }

  private getUserAgent(request: Request): string {
    const userAgent: string | undefined = request.get('user-agent');

    if (userAgent) return userAgent;

    throw new BadRequestException('Cant identify the User Agent of the client');
  }
}
