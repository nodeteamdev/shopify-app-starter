import { ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
export default class BaseExceptionFilter implements ExceptionFilter {
    private readonly logger;
    private readonly defaultMessage;
    private readonly defaultStatus;
    constructor(defaultMessage: string, defaultStatus: HttpStatus);
    catch(exception: any, host: ArgumentsHost): any;
}
