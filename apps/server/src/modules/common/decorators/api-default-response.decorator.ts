import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiOperation,
  ApiResponseOptions,
} from '@nestjs/swagger';
import ApiBaseResponses from '@decorators/api-base-response.decorator';
import {
  ApiCreatedBaseResponse,
  ApiOkBaseResponse,
} from '@decorators/api-ok-base-response.decorator';

export enum StatusCodes {
  OK = HttpStatus.OK,
  CREATED = HttpStatus.CREATED,
  NO_CONTENT = HttpStatus.NO_CONTENT,
}

interface DefaultResponseOptions {
  status?: StatusCodes;
  type?: string | any;
  meta?: boolean;
  isArray?: boolean;
  summary?: string;
}

const responses = {
  [StatusCodes.OK]: ApiOkBaseResponse,
  [StatusCodes.CREATED]: ApiCreatedBaseResponse,
  [StatusCodes.NO_CONTENT]: (options: ApiResponseOptions) =>
    ApiNoContentResponse({
      ...options,
      description: `${HttpStatus.NO_CONTENT}. No content.`,
    }),
};

const getResponse =
  (status: StatusCodes = StatusCodes.NO_CONTENT) =>
  ({
    dto,
    isArray,
    meta,
  }: {
    dto?: string | any;
    isArray?: boolean;
    meta?: boolean;
  }) => {
    return responses[status]({
      dto,
      isArray,
      meta,
    });
  };

export function ApiDefaultResponse({
  status = StatusCodes.OK,
  type,
  meta,
  isArray,
  summary,
}: DefaultResponseOptions) {
  const decorators = [
    getResponse(status)({
      dto: type,
      isArray,
      meta,
    }),
    ApiBaseResponses(),
    HttpCode(status),
  ];

  if (summary) decorators.push(ApiOperation({ summary }));

  return applyDecorators(...decorators);
}
