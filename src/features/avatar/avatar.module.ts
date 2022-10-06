import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarController } from './avatar.controller';
import { AvatarService } from './avatar.service';
import { Avatar } from '../models/Avatar';

@Module({
  imports: [TypeOrmModule.forFeature([Avatar])],
  providers: [AvatarService],
  controllers: [AvatarController],
})
export class AvatarModule {}
