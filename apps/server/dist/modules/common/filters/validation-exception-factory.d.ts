import { ValidationError } from '@nestjs/common';
import { ValidationException } from '@filters/validation.exception';
export interface TransformedErrors {
    [key: string]: string[];
}
export declare function validationExceptionFactory(validationErrors: ValidationError[]): ValidationException;
