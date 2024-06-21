import { HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiUnauthorizedBaseResponse = () => {
  return ApiUnauthorizedResponse({
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
    description: `${HttpStatus.UNAUTHORIZED}. Unauthorized.`,
  });
};

export const ApiBadRequestBaseResponse = () => {
  return ApiBadRequestResponse({
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
    description: `${HttpStatus.BAD_REQUEST}. Bad Request.`,
  });
};

export const ApiForbiddenBaseResponse = () => {
  return ApiForbiddenResponse({
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
    description: `${HttpStatus.FORBIDDEN}. Forbidden.`,
  });
};

export const ApiInternalServerErrorBaseResponse = () => {
  return ApiInternalServerErrorResponse({
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
    description: `${HttpStatus.INTERNAL_SERVER_ERROR}. Internal Server Error.`,
  });
};

export const ApiNotFoundBaseResponse = () => {
  return ApiNotFoundResponse({
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
    description: `${HttpStatus.NOT_FOUND}. Not found.`,
  });
};

export const ApiConflictBaseResponse = () => {
  return ApiConflictResponse({
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
    description: `${HttpStatus.CONFLICT}. Conflict.`,
  });
};

export const ApiUnprocessableEntityBaseResponse = () => {
  return ApiConflictResponse({
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
    description: `${HttpStatus.UNPROCESSABLE_ENTITY}. UnprocessableEntityException.`,
  });
};
