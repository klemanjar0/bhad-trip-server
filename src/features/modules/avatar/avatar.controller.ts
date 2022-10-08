import {
  Body,
  Controller,
  Get,
  StreamableFile,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarService } from './avatar.service';
import { S3FileGetObjectPayload } from '../../aws/s3/entities';
import ErrorService from '../../errors/ErrorService';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common/enums';
import * as fs from 'fs';

@Controller('avatar')
export class AvatarController {
  constructor(private avatarService: AvatarService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const data = await this.avatarService.uploadAvatar(file);
      return res.status(HttpStatus.CREATED).send(data);
    } catch (e) {
      const err = ErrorService.getError(e.message);
      return res.status(err.statusCode).send(err);
    }
  }

  @Post('get')
  async getFile(@Res() res: Response, @Body() body: S3FileGetObjectPayload) {
    try {
      const data = await this.avatarService.getAvatar(body);
      res.status(HttpStatus.OK).contentType(data.metadata.mimetype);
      data.body.pipe(res);
    } catch (e) {
      const err = ErrorService.getError(e.message);
      return res.status(err.statusCode).send(err);
    }
  }
}
