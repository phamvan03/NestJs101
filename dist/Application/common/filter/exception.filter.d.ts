import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { ILogger } from '../interfaces/logger.interface';
export declare class AllExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: ILogger);
    catch(exception: any, host: ArgumentsHost): void;
    private logMessage;
}
