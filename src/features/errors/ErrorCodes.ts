import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { HttpStatus } from '@nestjs/common/enums';

export enum ERROR {
  UNAUTHORIZED = 'ERR_UNAUTHORIZED',
  DATABASE_ERROR = 'ERR_DATABASE_ERROR',
  NO_ENTITY = 'ERR_NO_ENTITY',
  NO_FILE = 'ERR_NO_FILE',
  UNKNOWN = 'ERR_UNKNOWN',
}

export const ErrorCodes: Record<ERROR, string> = {
  [ERROR.UNAUTHORIZED]: 'Unauthorized.',
  [ERROR.DATABASE_ERROR]: 'Database Error.',
  [ERROR.NO_ENTITY]: 'Entity not found.',
  [ERROR.NO_FILE]: 'No file by provided path.',
  [ERROR.UNKNOWN]: 'Unknown Error.',
};

export const ErrorStatusCodes: Record<ERROR, ErrorHttpStatusCode> = {
  [ERROR.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
  [ERROR.DATABASE_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
  [ERROR.NO_ENTITY]: HttpStatus.NOT_FOUND,
  [ERROR.NO_FILE]: HttpStatus.NOT_FOUND,
  [ERROR.UNKNOWN]: HttpStatus.BAD_REQUEST,
};
