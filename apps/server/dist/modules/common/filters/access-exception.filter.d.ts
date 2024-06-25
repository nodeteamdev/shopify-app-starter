import { ArgumentsHost, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
export declare class AccessExceptionFilter extends BaseExceptionFilter {
    catch(exception: UnauthorizedException | ForbiddenException | any, host: ArgumentsHost): void;
    private catchUnauthorizedException;
    private catchForbiddenException;
}
