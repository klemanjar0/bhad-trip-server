import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avatar, AvatarField } from '../../models/Avatar';
import S3Service from '../../aws/s3/S3Service';
import { ENTITY, IMAGES_FOLDER } from '../../constants';
import {
  FileUploadResponse,
  S3FileGetObjectPayload,
} from '../../aws/s3/entities';
import { ERROR } from '../../errors/ErrorCodes';
import { UserField } from '../../models/User';

@Injectable()
export class AvatarService {
  entity = ENTITY.AVATAR;

  constructor(
    @InjectRepository(Avatar)
    private avatarRepository: Repository<Avatar>,
  ) {}

  async getAvatar(payload: S3FileGetObjectPayload) {
    if (!payload.key || !payload.bucketName) {
      throw new Error(ERROR.INCOMPLETE_REQUEST_DATA);
    }

    const entity = await this.avatarRepository.findOneBy({
      [AvatarField.AvatarFilePath]: payload.key,
    });

    if (!entity) {
      throw new Error(ERROR.NO_FILE);
    }

    return await S3Service.getFile(payload);
  }

  async getAvatarOwnerId(key: string) {
    if (!key) {
      throw new Error(ERROR.INCOMPLETE_REQUEST_DATA);
    }

    const entity = await this.avatarRepository.findOneBy({
      [AvatarField.AvatarFilePath]: key,
    });

    if (!entity) {
      throw new Error(ERROR.NO_FILE);
    }

    return entity[AvatarField.User][UserField.Id];
  }

  async uploadAvatar(
    file: Express.Multer.File,
    userId: number,
  ): Promise<FileUploadResponse> {
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
      [AvatarField.User]: { [UserField.Id]: userId },
    } as Avatar;

    const entity = await this.avatarRepository.create(payload);
    await entity.save();

    return { bucketName, path, fileToken };
  }
}
