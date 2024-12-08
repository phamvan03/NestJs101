export interface IFormatExceptionMessage {
  message: string;
  errorCode?: number;
}

export interface IException {
  notFoundException(data: IFormatExceptionMessage): void;
  badRequestException(data: IFormatExceptionMessage): void;
  internalServerErrorException(data?: IFormatExceptionMessage): void;
  forbiddenException(data?: IFormatExceptionMessage): void;
  unAuthorizedException(data?: IFormatExceptionMessage): void;
}
