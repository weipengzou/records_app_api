import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from './entities/record.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { IpageQuery } from 'src/interfcace';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(id: string, createRecordDto: CreateRecordDto) {
    const user: User = await this.userRepository.findOne(id);
    const records = new Record();
    records.title = createRecordDto.title;
    records.content = createRecordDto.content;
    records.user = user;
    return this.recordsRepository.save(records);
  }

  async findAll() {
    return await this.recordsRepository.find();
  }

  async findByUser(params: IpageQuery<{ userId?: string }>) {
    let user;
    if (params?.userId) user = await this.userRepository.findOne(params.userId);
    const { pageNumebr, pageSize } = params;
    const { take, skip } = new PageQuery({ pageNumebr, pageSize });

    return await this.recordsRepository.find({
      order: {
        id: 'DESC',
      },
      relations: ['user'],
      where: user && {
        user,
      },
      skip,
      take,
    });
  }

  async update(id: string, updateRecordDto: UpdateRecordDto) {
    return await this.recordsRepository.update(id, updateRecordDto);
  }

  async remove(id: string) {
    return await this.recordsRepository.delete(id);
  }
}
