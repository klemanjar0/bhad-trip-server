import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avatar } from '../models/Avatar';
import S3Service from '../aws/s3/S3Service';
import { IMAGES_FOLDER } from '../constants';
import { S3FileUploadResponse } from '../aws/s3/entities';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private avatarRepository: Repository<Avatar>,
  ) {}

  async uploadAvatar(file: Express.Multer.File): Promise<S3FileUploadResponse> {
    return await S3Service.uploadFile({ file, folder: IMAGES_FOLDER });
  }
}
