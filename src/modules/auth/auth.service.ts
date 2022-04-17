import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: LoginUserDto) {
    let userInfo: User;
    try {
      userInfo = (await this.userService.login(user))[0];
    } catch (error) {
      return error;
    }
    return {
      user: userInfo,
      access_token: this.jwtService.sign({ ...userInfo }),
    };
  }
}
