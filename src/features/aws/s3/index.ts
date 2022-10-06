import { S3Client } from '@aws-sdk/client-s3';
import { ENVService, ENVVar } from '../../env';

const env = ENVService.getVariables();

const REGION = env[ENVVar.AWS_REGION];

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: env[ENVVar.AWS_ACCESS_KEY_ID],
    secretAccessKey: env[ENVVar.AWS_SECRET_ACCESS_KEY],
  },
});

export { s3Client };
