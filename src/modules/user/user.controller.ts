import { Public } from './../../common/decorator/jwt.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
  @Public()
  @Post('logout')
  logout(@Headers('Authorization') Authorization: string) {
    return this.userService.logout(Authorization);
  }

  @Get('info')
  getUserInfo(@Req() req) {
    return req.user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('/update')
  update(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
