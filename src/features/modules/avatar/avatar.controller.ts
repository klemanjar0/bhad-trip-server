import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarService } from './avatar.service';
import { S3FileGetObjectPayload } from '../../aws/s3/entities';
import ErrorService from '../../errors/ErrorService';
import { Response, Request } from 'express';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthService } from '../auth/auth.service';

@Controller('avatar')
export class AvatarController {
  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const userData = await this.authService.checkAuth(req);
      const data = await this.avatarService.uploadAvatar(file, userData.sub);
      return res.status(HttpStatus.CREATED).send(data);
    } catch (e) {
      const err = ErrorService.getError(e.message);
      return res.status(err.statusCode).send(err);
    }
  }

  @Post('get')
  async getFile(
    @Res() res: Response,
    @Req() req: Request,
    @Body() body: S3FileGetObjectPayload,
  ) {
    try {
      await this.authService.checkAuth(req);
      const data = await this.avatarService.getAvatar(body);
      res.status(HttpStatus.OK).contentType(data.metadata.mimetype);
      data.body.pipe(res);
    } catch (e) {
      const err = ErrorService.getError(e.message);
      return res.status(err.statusCode).send(err);
    }
  }
}
