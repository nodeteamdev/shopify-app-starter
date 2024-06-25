"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientNotFoundError = void 0;
/**
 * Thrown when consumer tries to get client that does not exist.
 */
class ClientNotFoundError extends Error {
    constructor(namespace, type) {
        super(`The ${type === 'redis' ? 'redis' : 'cluster'} client "${namespace}" could not be found in the application context.`);
        this.name = ClientNotFoundError.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ClientNotFoundError = ClientNotFoundError;
