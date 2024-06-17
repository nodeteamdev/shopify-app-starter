import { INestApplicationContext, Inject, Injectable } from '@nestjs/common';
import { PrismaClientLike } from '@providers/prisma/custom/custom-prisma-options';
import { CUSTOM_PRISMA_CLIENT } from '@providers/prisma/custom/custom-prisma.constants';

@Injectable()
export class CustomPrismaService<Client extends PrismaClientLike> {
  constructor(
    @Inject(CUSTOM_PRISMA_CLIENT)
    public client: Client,
  ) {}

  async enableShutdownHooks(app: INestApplicationContext) {
    this.client.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
