import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarController } from './avatar.controller';
import { AvatarService } from './avatar.service';
import { Avatar } from '../../models/Avatar';
import { AuthService } from '../auth/auth.service';
import { User } from '../../models/User';

@Module({
  imports: [TypeOrmModule.forFeature([Avatar, User])],
  providers: [AvatarService, AuthService],
  controllers: [AvatarController],
})
export class AvatarModule {}
