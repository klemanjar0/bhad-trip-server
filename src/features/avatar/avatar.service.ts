import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avatar, AvatarField } from '../models/Avatar';
import S3Service from '../aws/s3/S3Service';
import { IMAGES_FOLDER } from '../constants';
import { FileUploadResponse, S3FileGetObjectPayload } from '../aws/s3/entities';
import ErrorService from '../errors/ErrorService';
import { ERROR } from '../errors/ErrorCodes';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private avatarRepository: Repository<Avatar>,
  ) {}

  async getAvatar(payload: S3FileGetObjectPayload) {
    const entity = await this.avatarRepository.findOneBy({
      [AvatarField.AvatarFilePath]: payload.key,
    });

    if (!entity) {
      throw new Error(ERROR.NO_FILE);
    }

    return await S3Service.getFile(payload);
  }

  async uploadAvatar(file: Express.Multer.File): Promise<FileUploadResponse> {
    const { bucketName, path, fileToken, metadata } =
      await S3Service.uploadFile({
        file,
        folder: IMAGES_FOLDER,
      });

    const payload = {
      [AvatarField.BucketName]: bucketName,
      [AvatarField.AvatarFilePath]: path,
      [AvatarField.AvatarName]: fileToken,
      [AvatarField.AvatarFileType]: metadata.mimetype,
      [AvatarField.AvatarFileSize]: metadata.size,
    } as Avatar;

    const entity = await this.avatarRepository.create(payload);
    await entity.save();

    return { bucketName, path, fileToken };
  }
}
