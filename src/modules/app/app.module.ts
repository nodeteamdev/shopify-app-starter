import { Module } from '@nestjs/common';
import { AppController } from '@modules/app/app.controller';
import { AppService } from '@modules/app/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
