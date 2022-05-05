import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: LoginUserDto) {
    console.log('userInfo');
    const userInfo = await this.userService.login(user);
    console.log(userInfo);
    return {
      user: userInfo,
      access_token: this.jwtService.sign({ ...userInfo }),
    };
  }
}
