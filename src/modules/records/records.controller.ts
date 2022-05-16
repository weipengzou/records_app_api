import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  DefaultValuePipe,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Public } from '@/common/decorator/jwt.decorator';
import { IPageQuery } from '@/utils/pageQuery';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto, @Req() req) {
    return this.recordsService.create(req.user.id, createRecordDto);
  }

  // @Get()
  // async findAll(@Req() req) {
  //   return this.recordsService.findAll();
  // }

  @Public()
  @Post('pageFind')
  findByUser(@Body() body: IPageQuery<{ userId: string }>) {
    return this.recordsService.findByUser(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordDto: UpdateRecordDto) {
    return this.recordsService.update(id, updateRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordsService.remove(id);
  }
}
