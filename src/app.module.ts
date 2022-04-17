import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RecordsModule } from './modules/records/records.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'sh-cynosdbmysql-grp-3ngyyz0w.sql.tencentcdb.com',
  port: 25554,
  username: 'root',
  password: '310088vb!',
  database: 'records',
  keepConnectionAlive: true,
  synchronize: true,
  autoLoadEntities: true,
};
@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    UserModule,
    RecordsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
