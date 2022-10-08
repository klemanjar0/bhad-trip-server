import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './features/db/postgres';
import { AvatarModule } from './features/modules/avatar/avatar.module';
import { AuthModule } from './features/modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, AvatarModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
