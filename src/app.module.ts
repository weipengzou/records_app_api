import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsModule } from './modules/records/records.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { Connection } from 'typeorm';
import { getDataBaseCongfig } from './config/database';

console.log(`ENV MODE:${process.env.MODE}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.${process.env.MODE}.env`],
    }),
    TypeOrmModule.forRoot(getDataBaseCongfig()),
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
export class AppModule {
  constructor(private connection: Connection) {}
}
