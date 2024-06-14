import { Readable } from 'node:stream';
import { Response } from 'express';
import { HttpStatus, Logger, StreamableFile } from '@nestjs/common';
import { FileMimeType } from '@modules/common/types/file-mime-type.type';
import { FileMimeTypesEnum } from '@modules/common/enums/file-mime-types.enum';
import { FileExtension } from '@modules/common/types/file-extension.type';
import { sendErrorToSentry } from '@modules/common/helpers/send-error-to-sentry.helper';

export class DocumentStreamableFile extends StreamableFile {
  private static getFileMimeType(fileName: string): FileMimeType {
    const fileExtension: FileExtension | string = fileName
      .split('.')
      .at(-1)
      ?.toUpperCase();

    return (
      FileMimeTypesEnum[fileExtension as keyof typeof FileMimeTypesEnum] ||
      FileMimeTypesEnum.BINARY
    );
  }

  private static getStreamableFileOptions(
    fileName: string,
    disposition: boolean | 'inline' = 'inline',
  ): { type: string; disposition?: string } {
    const mimeType: FileMimeType = DocumentStreamableFile.getFileMimeType(
      fileName as string,
    );

    if (!disposition) {
      return {
        type: mimeType,
      };
    }

    if (disposition === 'inline') {
      return {
        type: mimeType,
        disposition: 'inline',
      };
    }

    return {
      type: mimeType,
      disposition: `attachment; filename="${fileName}"`,
    };
  }

  constructor(
    fileName: string,
    readable: Readable,
    disposition: boolean | 'inline' = true,
  ) {
    super(
      readable,
      DocumentStreamableFile.getStreamableFileOptions(fileName, disposition),
    );

    this.setErrorHandler(
      (err: Error | (Error & { code: number }), res: unknown): void => {
        const response = res as Response;

        if (response.headersSent) {
          const message =
            'An error ocurred after the data stream headers were sent to the client';

          Logger.error(new Error(message));
          Logger.error(err);

          return sendErrorToSentry(err, {
            message,
            fileName,
          });
        }

        const statusCode: HttpStatus =
          'code' in err ? (err.code as HttpStatus) : HttpStatus.BAD_REQUEST;

        response.setHeader(
          'Content-Type',
          `${FileMimeTypesEnum.JSON}; charset=utf-8`,
        );

        response.removeHeader('Content-Disposition');

        const errorBody = {
          success: false,
          error: {
            code: 400001,
            message:
              err?.message.replaceAll(':', '').replaceAll('ERROR', '').trim() ||
              'The request you are trying to make is invalid.',
            details: 'Bad request',
          },
        };

        response.status(statusCode).send(JSON.stringify(errorBody));
      },
    );
  }
}
