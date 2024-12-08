"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let AllExceptionFilter = class AllExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof common_1.HttpException
            ? exception.getResponse()
            : {
                message: exception.message,
                code_error: null,
            };
        const responseData = {
            ...{
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            },
            ...message,
        };
        this.logMessage(request, message, status, exception);
        response.status(status).send(responseData);
    }
    logMessage(request, message, status, exception) {
        if (status === 500) {
            this.logger.error(`End Request for ${request.url}`, `method=${request.method} status=${status} code_error=${message.code_error ? message.code_error : null} message=${message.message ? message.message : null}`, status >= 500 ? exception.stack : '');
        }
        else {
            this.logger.warn(`End Request for ${request.url}`, `method=${request.method} status=${status} code_error=${message.code_error ? message.code_error : null} message=${message.message ? message.message : null}`);
        }
    }
};
exports.AllExceptionFilter = AllExceptionFilter;
exports.AllExceptionFilter = AllExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [Object])
], AllExceptionFilter);
//# sourceMappingURL=exception.filter.js.map