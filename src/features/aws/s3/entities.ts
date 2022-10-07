export interface S3FileUploadPayload {
  file: Express.Multer.File;
  folder: string;
}

export interface S3FileUploadResponse {
  fileToken: string;
  path: string;
  bucketName: string;
  metadata: {
    filename: string;
    mimetype: string;
    path: string;
    originalname: string;
    size: string;
  };
}

export interface FileUploadResponse {
  fileToken: string;
  path: string;
  bucketName: string;
}

export interface S3FileGetObjectPayload {
  bucketName: string;
  key: string;
}
