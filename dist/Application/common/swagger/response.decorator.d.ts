import { Type } from '@nestjs/common';
export declare const ApiResponseType: <TModel extends Type<any>>(model: TModel, isArray: boolean) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
