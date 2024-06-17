import { INTERNAL_SERVER_ERROR } from '@constants/errors.constants';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    const status: number = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status >= 500) {
      Sentry.withScope((scope) => {
        const { referer } = ctx.getRequest().headers;

        const userId =
          ctx.getRequest() && ctx.getRequest().user
            ? ctx.getRequest().user.id
            : undefined;

        if (referer) {
          scope.setTag('referer', referer);
        }

        if (userId) {
          scope.setUser({ id: userId });
        }

        scope.addEventProcessor((event) => {
          return Sentry.Handlers.parseRequest(event, ctx.getRequest());
        });

        return Sentry.captureException(exception);
      });
    }

    const errorMessage = exception?.response?.message || INTERNAL_SERVER_ERROR;

    const [code, message] = errorMessage.split(':');

    if (!message) {
      const [serverErrorCode] = INTERNAL_SERVER_ERROR.split(':');

      const exceptionResponse = {
        success: false,
        error: {
          code: parseInt(serverErrorCode, 10),
          message: errorMessage?.trim() || INTERNAL_SERVER_ERROR,
          details: exception?.response?.error,
        },
      };

      this.logger.error(exception);
      this.logger.error(exception.stack);

      return res.status(status).json(exceptionResponse);
    }

    const exceptionResponse = {
      success: false,
      error: {
        code: parseInt(code, 10),
        message: message?.trim(),
        details: exception?.response?.error,
      },
    };

    this.logger.error(exception);
    this.logger.error(exception.stack);

    return res.status(status).json(exceptionResponse);
  }
}
