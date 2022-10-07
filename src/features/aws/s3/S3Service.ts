import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { s3Client } from './index';
import { PutObjectCommandInput } from '@aws-sdk/client-s3/dist-types/commands/PutObjectCommand';
import { ENVService, ENVVar } from '../../env';

import { v4 as uuidv4 } from 'uuid';
import {
  S3FileGetObjectPayload,
  S3FileUploadPayload,
  S3FileUploadResponse,
} from './entities';
import { GetObjectRequest } from '@aws-sdk/client-s3/dist-types/models/models_0';
import { Readable } from 'stream';

const env = ENVService.getVariables();

interface IS3Service {
  s3Client: S3Client | null;
  uploadFile: (props: S3FileUploadPayload) => Promise<S3FileUploadResponse>;
  getFile: (payload: S3FileGetObjectPayload) => any;
}

class S3Service implements IS3Service {
  s3Client: S3Client = null;

  constructor(client: S3Client) {
    this.s3Client = client;
  }

  async uploadFile(props: S3FileUploadPayload): Promise<S3FileUploadResponse> {
    const { file, folder } = props;

    const key = uuidv4();
    const path = `${folder}/${key}`;

    const metadata = {
      filename: file.filename,
      mimetype: file.mimetype,
      path: file.path,
      originalname: file.originalname,
      size: file.size.toString(),
    };

    const params: PutObjectCommandInput = {
      Bucket: env[ENVVar.BUCKET_NAME],
      Key: path,
      Body: file.buffer,
      Metadata: metadata,
    };

    await this.s3Client.send(new PutObjectCommand(params));

    return {
      fileToken: key,
      path,
      bucketName: env[ENVVar.BUCKET_NAME],
      metadata,
    };
  }

  async getFile(payload: S3FileGetObjectPayload) {
    const params: GetObjectRequest = {
      Bucket: payload.bucketName,
      Key: payload.key,
    };

    const data = await this.s3Client.send(new GetObjectCommand(params));
    return data.Body as Readable;
  }
}

export default new S3Service(s3Client);
