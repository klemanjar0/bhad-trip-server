import { config } from 'dotenv';

export enum ENVVar {
  DB_TYPE = 'DB_TYPE',
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASS = 'DB_PASS',
  DB_NAME = 'DB_NAME',
}

export interface ENVVariables {
  [ENVVar.DB_TYPE]: string;
  [ENVVar.DB_HOST]: string;
  [ENVVar.DB_PORT]: string;
  [ENVVar.DB_USERNAME]: string;
  [ENVVar.DB_PASS]: string;
  [ENVVar.DB_NAME]: string;
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
