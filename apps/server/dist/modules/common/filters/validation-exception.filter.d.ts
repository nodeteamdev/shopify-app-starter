import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { ValidationException } from '@filters/validation.exception';
export declare class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost): any;
}
