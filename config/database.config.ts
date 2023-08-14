import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as entities from '../src/entities/index';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  database: process.env.DATABASE_NAME || 'cmk-local',
  username: process.env.DATABASE_USENAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || '123456789',
  synchronize:
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'staging',
  entities: Object.values(entities),
};
