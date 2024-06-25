"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRejection = exports.isResolution = exports.isError = exports.isSymbol = exports.isString = void 0;
/**
 * Returns `true` if the value is of type `string`.
 *
 * @param value - Any value
 */
const isString = (value) => typeof value === 'string';
exports.isString = isString;
/**
 * Returns `true` if the value is of type `symbol`.
 *
 * @param value - Any value
 */
const isSymbol = (value) => typeof value === 'symbol';
exports.isSymbol = isSymbol;
/**
 * Returns `true` if the value is an instance of `Error`.
 *
 * @param value - Any value
 */
const isError = (value) => {
    const typeName = Object.prototype.toString.call(value).slice(8, -1);
    return typeName === 'Error';
};
exports.isError = isError;
/**
 * Returns `true` if the value is of type `PromiseFulfilledResult`.
 *
 * @param value - `PromiseSettledResult`
 */
const isResolution = (value) => {
    return value.status === 'fulfilled';
};
exports.isResolution = isResolution;
/**
 * Returns `true` if the value is of type `PromiseRejectedResult`.
 *
 * @param value - `PromiseSettledResult`
 */
const isRejection = (value) => {
    return value.status === 'rejected';
};
exports.isRejection = isRejection;
