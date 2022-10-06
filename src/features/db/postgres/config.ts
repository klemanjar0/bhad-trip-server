import entities from './entities';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { ENVService, ENVVar } from '../../env';

const env = ENVService.getVariables();

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: env[ENVVar.DB_HOST],
  port: Number(env[ENVVar.DB_PORT]),
  username: env[ENVVar.DB_USERNAME],
  password: env[ENVVar.DB_PASS],
  database: env[ENVVar.DB_NAME],
  entities,
  synchronize: true,
};

export default dbConfig;
