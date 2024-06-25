"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_LOG = exports.READY_LOG = void 0;
const READY_LOG = (namespace) => `${namespace}: connected successfully to the server`;
exports.READY_LOG = READY_LOG;
const ERROR_LOG = (namespace, message) => `${namespace}: ${message}`;
exports.ERROR_LOG = ERROR_LOG;
