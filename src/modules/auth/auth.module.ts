import { AuthController } from '@modules/auth/auth.controller';
import { authPermissions } from '@modules/auth/auth.permissions';
import { TokenRepository } from '@modules/auth/repositories/token.repository';
import { AuthService } from '@modules/auth/services/auth.service';
import { TokenService } from '@modules/auth/services/token.service';
import { CaslModule } from '@modules/casl';
import { EmailModule } from '@modules/email/email.module';
import { UserModule } from '@modules/user/user.module';
import { UserRepository } from '@modules/user/user.repository';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@providers/prisma';
import { RedisModule } from '@providers/redis/redis.module';

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    UserModule,
    EmailModule,
    CaslModule.forFeature({ permissions: authPermissions }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, UserRepository, TokenRepository],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
