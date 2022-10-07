import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';

export interface HTTPError {
  message: string;
  statusCode: ErrorHttpStatusCode;
  timestamp: string;
}
