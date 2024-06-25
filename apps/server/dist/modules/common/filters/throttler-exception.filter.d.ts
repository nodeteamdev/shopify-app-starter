import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
export declare class ThrottlerExceptionsFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: ThrottlerException, host: ArgumentsHost): any;
}
