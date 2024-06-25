import { BadRequestException } from '@nestjs/common';
import { TransformedErrors } from '@filters/validation-exception-factory';
export declare class ValidationException extends BadRequestException {
    validationErrors: TransformedErrors | TransformedErrors[];
    constructor(validationErrors: TransformedErrors | TransformedErrors[]);
}
