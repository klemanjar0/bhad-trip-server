export interface S3FileUploadPayload {
  file: Express.Multer.File;
  folder: string;
}

export interface S3FileUploadResponse {
  fileToken: string;
  path: string;
}
