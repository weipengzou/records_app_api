import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateRecordDto } from './create-record.dto';

export class UpdateRecordDto extends PartialType(CreateRecordDto) {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsNumber()
  like: number;
}
