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
import ErrorService from '../errors/ErrorService';

@Controller('avatar')
export class AvatarController {
  constructor(private avatarService: AvatarService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      return await this.avatarService.uploadAvatar(file);
    } catch (e) {
      return ErrorService.getError(e.message);
    }
  }

  @Post('get')
  async getFile(@Body() body: S3FileGetObjectPayload) {
    try {
      return await this.avatarService.getAvatar(body);
    } catch (e) {
      return ErrorService.getError(e.message);
    }
  }
}
