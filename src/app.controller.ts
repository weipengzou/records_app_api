import { Public } from './common/decorator/jwt.decorator';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
