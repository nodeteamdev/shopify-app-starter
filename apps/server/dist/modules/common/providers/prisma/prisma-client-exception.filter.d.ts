import { ArgumentsHost, HttpServer } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
export type ErrorCodesStatusMapping = {
    [key: string]: number;
};
export declare class PrismaClientExceptionFilter extends BaseExceptionFilter {
    private errorCodesStatusMapping;
    constructor(applicationRef?: HttpServer, errorCodesStatusMapping?: ErrorCodesStatusMapping);
    catch(exception: Prisma.PrismaClientKnownRequestError | Prisma.NotFoundError | any, host: ArgumentsHost): void;
    private catchClientKnownRequestError;
    private catchNotFoundError;
    private exceptionShortMessage;
}
