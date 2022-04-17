import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { STATUS_CODES } from 'http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CustomResponse<T> {
  data: T;
  code: number;
  message: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, CustomResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CustomResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        code: 200,
        message: STATUS_CODES[data?.status] ?? 'scuess!',
      })),
    );
  }
}
