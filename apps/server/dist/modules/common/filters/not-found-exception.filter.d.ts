import { ExceptionFilter, NotFoundException } from '@nestjs/common';
export declare class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: any): any;
}
