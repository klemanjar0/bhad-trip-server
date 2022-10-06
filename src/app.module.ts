import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './features/db/postgres';
import { AvatarModule } from './features/avatar/avatar.module';

@Module({
  imports: [DatabaseModule, AvatarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
