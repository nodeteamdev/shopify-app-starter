"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiBaseResponses = () => {
    const decorators = [
        (0, swagger_1.ApiUnauthorizedResponse)({
            schema: {
                type: 'object',
                example: {
                    success: false,
                    error: {
                        code: 401000,
                        message: 'Unauthorized resource',
                        details: 'The resource you are trying to access is unauthorized.',
                    },
                },
            },
            description: `${common_1.HttpStatus.UNAUTHORIZED}. Unauthorized.`,
        }),
        (0, swagger_1.ApiBadRequestResponse)({
            schema: {
                type: 'object',
                example: {
                    success: false,
                    error: {
                        code: 400000,
                        message: 'Bad request',
                        details: 'The request you are trying to make is invalid.',
                    },
                },
            },
            description: `${common_1.HttpStatus.BAD_REQUEST}. Bad Request.`,
        }),
        (0, swagger_1.ApiInternalServerErrorResponse)({
            schema: {
                type: 'object',
                example: {
                    success: false,
                    error: {
                        code: 500000,
                        message: 'Internal server error',
                        details: 'Something went wrong.',
                    },
                },
            },
            description: `${common_1.HttpStatus.INTERNAL_SERVER_ERROR}. Internal Server Error.`,
        }),
        (0, swagger_1.ApiNotFoundResponse)({
            schema: {
                type: 'object',
                example: {
                    success: false,
                    error: {
                        code: 404000,
                        message: 'Not found',
                        details: 'The resource you are trying to access does not exist.',
                    },
                },
            },
            description: `${common_1.HttpStatus.NOT_FOUND}. Not found.`,
        }),
    ];
    return (0, common_1.applyDecorators)(...decorators);
};
exports.default = ApiBaseResponses;
//# sourceMappingURL=api-base-response.decorator.js.map