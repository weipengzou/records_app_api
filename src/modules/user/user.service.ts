import { LoginUserDto } from './dto/login-user.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { compareSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const res = await this.usersRepository.findOne({
      where: { account: loginUserDto.account },
      select: ['password'],
    });

    if (!compareSync(loginUserDto.password, res.password))
      return Promise.reject(new NotFoundException('账号/密码错误'));

    const userInfo = await this.usersRepository.findOne({
      where: { account: loginUserDto.account },
    });
    return userInfo;
  }

  async logout(token: string) {
    const tokens: string = localStorage.getItem('token');
    const newTokens = [...tokens.split(','), token].join();
    localStorage.setItem('tokens', newTokens);
  }

  async register(createUserDto: CreateUserDto) {
    const res = await this.usersRepository.findOne({
      where: { account: createUserDto.account },
    });
    if (res) return Promise.reject(new BadRequestException('账号已存在'));
    const userInfo = await this.usersRepository.create(createUserDto);
    return this.usersRepository.save(userInfo);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(updateUserDto.id, {
      account: updateUserDto.account,
      avatar: updateUserDto.avatar,
      email: updateUserDto.email,
      phone: updateUserDto.phone,
      display_name: updateUserDto.displayName,
    });
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
