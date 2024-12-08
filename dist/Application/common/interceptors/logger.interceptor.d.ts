import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ILogger } from '../interfaces/logger.interface';
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly logger;
    constructor(logger: ILogger);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private getIP;
}
