"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiUnprocessableEntityBaseResponse = exports.ApiConflictBaseResponse = exports.ApiNotFoundBaseResponse = exports.ApiInternalServerErrorBaseResponse = exports.ApiForbiddenBaseResponse = exports.ApiBadRequestBaseResponse = exports.ApiUnauthorizedBaseResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiUnauthorizedBaseResponse = () => {
    return (0, swagger_1.ApiUnauthorizedResponse)({
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
    });
};
exports.ApiUnauthorizedBaseResponse = ApiUnauthorizedBaseResponse;
const ApiBadRequestBaseResponse = () => {
    return (0, swagger_1.ApiBadRequestResponse)({
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
    });
};
exports.ApiBadRequestBaseResponse = ApiBadRequestBaseResponse;
const ApiForbiddenBaseResponse = () => {
    return (0, swagger_1.ApiForbiddenResponse)({
        schema: {
            type: 'object',
            example: {
                success: false,
                error: {
                    code: 403000,
                    message: 'Forbidden resource',
                    details: 'The request you are trying to make is forbidden.',
                },
            },
        },
        description: `${common_1.HttpStatus.FORBIDDEN}. Forbidden.`,
    });
};
exports.ApiForbiddenBaseResponse = ApiForbiddenBaseResponse;
const ApiInternalServerErrorBaseResponse = () => {
    return (0, swagger_1.ApiInternalServerErrorResponse)({
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
    });
};
exports.ApiInternalServerErrorBaseResponse = ApiInternalServerErrorBaseResponse;
const ApiNotFoundBaseResponse = () => {
    return (0, swagger_1.ApiNotFoundResponse)({
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
    });
};
exports.ApiNotFoundBaseResponse = ApiNotFoundBaseResponse;
const ApiConflictBaseResponse = () => {
    return (0, swagger_1.ApiConflictResponse)({
        schema: {
            type: 'object',
            example: {
                success: false,
                error: {
                    code: 409001,
                    message: 'Conflict',
                    details: 'The resource you are trying to access is conflicted',
                },
            },
        },
        description: `${common_1.HttpStatus.CONFLICT}. Conflict.`,
    });
};
exports.ApiConflictBaseResponse = ApiConflictBaseResponse;
const ApiUnprocessableEntityBaseResponse = () => {
    return (0, swagger_1.ApiConflictResponse)({
        schema: {
            type: 'object',
            example: {
                success: false,
                error: {
                    code: 422000,
                    message: 'UnprocessableEntityException',
                    details: 'Invalid Data',
                },
            },
        },
        description: `${common_1.HttpStatus.UNPROCESSABLE_ENTITY}. UnprocessableEntityException.`,
    });
};
exports.ApiUnprocessableEntityBaseResponse = ApiUnprocessableEntityBaseResponse;
//# sourceMappingURL=api-base-responses.decorator.js.map