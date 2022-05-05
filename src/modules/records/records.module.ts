import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { Record } from './entities/record.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record, User])],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
