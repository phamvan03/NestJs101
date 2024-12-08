"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseType = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_interceptor_1 = require("../../common/interceptors/response.interceptor");
const ApiResponseType = (model, isArray) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOkResponse)({
        isArray: isArray,
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(response_interceptor_1.ResponseFormat) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)(model),
                        },
                        isArray: {
                            type: 'boolean',
                            default: isArray,
                        },
                    },
                },
            ],
        },
    }));
};
exports.ApiResponseType = ApiResponseType;
//# sourceMappingURL=response.decorator.js.map