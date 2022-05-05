import { IsString } from 'class-validator';

export class CreateRecordDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
}
