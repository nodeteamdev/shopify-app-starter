"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationExceptionFactory = void 0;
const validation_exception_1 = require("./validation.exception");
function transformErrors(errors) {
    return errors.reduce((acc, error) => {
        if (error.children?.length && error.children.length !== 0) {
            const childrenErrors = error.children;
            return [...acc, ...transformErrors(childrenErrors)];
        }
        acc.push({
            [error.property]: error.constraints
                ? Object.values(error.constraints)
                : [],
        });
        return acc;
    }, []);
}
function validationExceptionFactory(validationErrors) {
    return new validation_exception_1.ValidationException(transformErrors(validationErrors));
}
exports.validationExceptionFactory = validationExceptionFactory;
//# sourceMappingURL=validation-exception-factory.js.map