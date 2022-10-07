export enum ERROR {
  UNAUTHORIZED = 'ERR_UNAUTHORIZED',
  DATABASE_ERROR = 'ERR_DATABASE_ERROR',
  NO_ENTITY = 'ERR_NO_ENTITY',
  NO_FILE = 'ERR_NO_FILE',
  UNKNOWN = 'ERR_UNKNOWN',
}

export const ErrorCodes = {
  [ERROR.UNAUTHORIZED]: 'Unauthorized.',
  [ERROR.DATABASE_ERROR]: 'Database Error.',
  [ERROR.NO_ENTITY]: 'Entity not found.',
  [ERROR.NO_FILE]: 'No file by provided path.',
  [ERROR.NO_FILE]: 'No file by provided path.',
  [ERROR.UNKNOWN]: 'Unknown Error.',
};
