import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDataBaseCongfig = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'records',
  entities: ['dist/**/*.entity.js'],
  autoLoadEntities: true,
  keepConnectionAlive: true,
});
