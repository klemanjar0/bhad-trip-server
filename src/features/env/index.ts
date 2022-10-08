import { config } from 'dotenv';

export enum ENVVar {
  DB_TYPE = 'DB_TYPE',
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASS = 'DB_PASS',
  DB_NAME = 'DB_NAME',
  AWS_REGION = 'AWS_REGION',
  BUCKET_NAME = 'BUCKET_NAME',
  AWS_ACCESS_KEY_ID = 'AWS_ACCESS_KEY_ID',
  AWS_SECRET_ACCESS_KEY = 'AWS_SECRET_ACCESS_KEY',
  JWT_MAX_AGE = 'JWT_MAX_AGE',
  JWT_SECRET = 'JWT_SECRET',
}

export interface ENVVariables {
  [ENVVar.DB_TYPE]: string;
  [ENVVar.DB_HOST]: string;
  [ENVVar.DB_PORT]: string;
  [ENVVar.DB_USERNAME]: string;
  [ENVVar.DB_PASS]: string;
  [ENVVar.DB_NAME]: string;
  [ENVVar.AWS_REGION]: string;
  [ENVVar.BUCKET_NAME]: string;
  [ENVVar.AWS_ACCESS_KEY_ID]: string;
  [ENVVar.AWS_SECRET_ACCESS_KEY]: string;
  [ENVVar.JWT_MAX_AGE]: string;
  [ENVVar.JWT_SECRET]: string;
}

export class ENVService {
  private static variables: ENVVariables = null;

  private constructor(vars: unknown) {
    ENVService.variables = vars as ENVVariables;
  }

  public static getVariables = () => {
    if (!ENVService.variables) {
      const vars = config().parsed;
      new ENVService(vars);
    }

    return ENVService.variables;
  };
}
