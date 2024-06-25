/**
 * Returns `true` if the value is of type `string`.
 *
 * @param value - Any value
 */
export declare const isString: (value: unknown) => value is string;
/**
 * Returns `true` if the value is of type `symbol`.
 *
 * @param value - Any value
 */
export declare const isSymbol: (value: unknown) => value is symbol;
/**
 * Returns `true` if the value is an instance of `Error`.
 *
 * @param value - Any value
 */
export declare const isError: (value: unknown) => value is Error;
/**
 * Returns `true` if the value is of type `PromiseFulfilledResult`.
 *
 * @param value - `PromiseSettledResult`
 */
export declare const isResolution: <T>(value: PromiseSettledResult<T>) => value is PromiseFulfilledResult<T>;
/**
 * Returns `true` if the value is of type `PromiseRejectedResult`.
 *
 * @param value - `PromiseSettledResult`
 */
export declare const isRejection: (value: PromiseSettledResult<unknown>) => value is PromiseRejectedResult;
