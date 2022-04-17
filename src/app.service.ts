import { Injectable, Req } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to use records api service!';
  }
}
