import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import RedisClient from 'ioredis';
import { ServerOptions } from 'socket.io';

export class RedisIoAdapter extends IoAdapter {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  private adapterConstructor: ReturnType<typeof createAdapter> | undefined;

  async connectToRedis(): Promise<void> {
    const redisUrl = new URL(this.configService.get<string>('redis.url')!);

    const pubClient = new RedisClient({
      host: redisUrl.hostname,
      port: parseInt(redisUrl.port, 10),
    });

    const subClient = pubClient.duplicate();

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);

    server.adapter(this.adapterConstructor);

    return server;
  }
}
