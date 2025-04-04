/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;
    const httpMethod: unknown = context.switchToHttp().getRequest().method;

    return next.handle().pipe(
      map((data) => {
        return {
          statusCode,
          method: httpMethod,
          data,
        };
      }),
      catchError((error) => {
        const statusCode =
          error instanceof HttpException ? error.getStatus() : 500;
        const errorResponse = {
          statusCode,
          message: error.message || new InternalServerErrorException(),
          error: error.name || 'Error',
          timestamp: Date.now(),
          data: {},
        };
        return throwError(() => new HttpException(errorResponse, statusCode));
      }),
    );
  }
}
