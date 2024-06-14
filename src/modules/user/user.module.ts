import { Module } from '@nestjs/common';
import { UserRepository } from '@modules/user/user.repository';
import { UserService } from '@modules/user/user.service';
import { PrismaModule } from '@providers/prisma';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
