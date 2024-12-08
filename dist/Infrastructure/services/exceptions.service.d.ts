import { IException, IFormatExceptionMessage } from './../../Application/common/interfaces/exceptions.interface';
export declare class ExceptionsService implements IException {
    notFoundException(data: IFormatExceptionMessage): void;
    badRequestException(data: IFormatExceptionMessage): void;
    internalServerErrorException(data?: IFormatExceptionMessage): void;
    forbiddenException(data?: IFormatExceptionMessage): void;
    unAuthorizedException(data?: IFormatExceptionMessage): void;
}
