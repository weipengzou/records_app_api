import { Controller, Post, Body } from '@nestjs/common';
import { Public } from '../../common/decorator/jwt.decorator';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('/login')
  async login(@Body() payload: LoginUserDto) {
    return this.authService.login(payload);
  }
}
