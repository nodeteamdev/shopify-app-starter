"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingConfigurationsError = void 0;
/**
 * Thrown when async configurations are missing.
 */
class MissingConfigurationsError extends Error {
    constructor() {
        super(`The asynchronous configurations are missing. Expected one of: "useFactory", "useClass", "useExisting".`);
        this.name = MissingConfigurationsError.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.MissingConfigurationsError = MissingConfigurationsError;
