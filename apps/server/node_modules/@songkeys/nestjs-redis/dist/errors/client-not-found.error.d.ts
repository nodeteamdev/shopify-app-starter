import { ClientType } from '../interfaces';
/**
 * Thrown when consumer tries to get client that does not exist.
 */
export declare class ClientNotFoundError extends Error {
    constructor(namespace: string, type: ClientType);
}
