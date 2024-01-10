import 'reflect-metadata';
import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { Movie } from './entites/Movies.entity';

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

// console.log('NODE_ENV', process.env);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.RDS_HOSTNAME,
  port: parseInt(process.env.RDS_PORT || '5432'),
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  synchronize: NODE_ENV === 'dev' ? false : true,
  //logging logs sql command on the treminal
  logging: NODE_ENV === 'dev' ? false : false,
  entities: [Movie],
  migrations:
    NODE_ENV === 'dev' ? ['src/migration/**/*.ts'] : ['dist/migration/**/*.js'],
  subscribers: [],
  ssl:
    NODE_ENV === 'dev'
      ? {
          rejectUnauthorized: false,
        }
      : true,
});
