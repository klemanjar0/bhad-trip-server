import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { s3Client } from './index';
import { PutObjectCommandInput } from '@aws-sdk/client-s3/dist-types/commands/PutObjectCommand';
import { ENVService, ENVVar } from '../../env';

import { v4 as uuidv4 } from 'uuid';
import { S3FileUploadPayload, S3FileUploadResponse } from './entities';

const env = ENVService.getVariables();

interface IS3Service {
  s3Client: S3Client | null;
  uploadFile: (props: S3FileUploadPayload) => Promise<S3FileUploadResponse>;
}

class S3Service implements IS3Service {
  s3Client: S3Client = null;

  constructor(client: S3Client) {
    this.s3Client = client;
  }

  async uploadFile(props: S3FileUploadPayload) {
    const { file, folder } = props;

    const key = uuidv4();
    const path = `${folder}/${key}`;

    try {
      const params: PutObjectCommandInput = {
        Bucket: env[ENVVar.BUCKET_NAME],
        Key: path,
        Body: file.buffer,
        Metadata: {
          filename: file.filename,
          mimetype: file.mimetype,
          path: file.path,
          originalname: file.originalname,
          size: file.size.toString(),
        },
      };

      await this.s3Client.send(new PutObjectCommand(params));

      return {
        fileToken: key,
        path: path,
      };
    } catch (e) {
      console.log(e);
    }
  }
}

export default new S3Service(s3Client);
