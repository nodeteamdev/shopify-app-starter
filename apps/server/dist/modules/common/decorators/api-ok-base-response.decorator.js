"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCreatedBaseResponse = exports.ApiOkBaseResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const ApiOkBaseResponse = ({ dto, isArray, meta, }) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOkResponse)({
        description: `${common_1.HttpStatus.OK}. Success`,
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                data: isArray
                    ? { items: { $ref: (0, swagger_1.getSchemaPath)(dto || '') }, type: 'array' }
                    : { $ref: (0, swagger_1.getSchemaPath)(dto || '') },
                ...(meta && {
                    meta: {
                        properties: {
                            total: { type: 'number' },
                            lastPage: { type: 'number' },
                            currentPage: { type: 'number' },
                            perPage: { type: 'number' },
                            prev: { type: 'number' },
                            next: { type: 'number' },
                        },
                    },
                }),
            },
        },
    }));
};
exports.ApiOkBaseResponse = ApiOkBaseResponse;
const ApiCreatedBaseResponse = ({ dto, isArray, } = {}) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiCreatedResponse)({
        description: `${common_1.HttpStatus.CREATED}. Created`,
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                data: isArray
                    ? { items: { $ref: (0, swagger_1.getSchemaPath)(dto || '') }, type: 'array' }
                    : { $ref: (0, swagger_1.getSchemaPath)(dto || '') },
            },
        },
    }));
};
exports.ApiCreatedBaseResponse = ApiCreatedBaseResponse;
//# sourceMappingURL=api-ok-base-response.decorator.js.map