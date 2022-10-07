import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarService } from './avatar.service';
import { S3FileGetObjectPayload } from '../aws/s3/entities';

@Controller('avatar')
export class AvatarController {
  constructor(private avatarService: AvatarService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.avatarService.uploadAvatar(file);
  }

  @Post('get')
  async getFile(@Body() body: S3FileGetObjectPayload) {
    return await this.avatarService.getAvatar(body);
  }
}
