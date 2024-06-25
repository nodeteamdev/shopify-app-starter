"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNamespace = void 0;
const is_1 = require("./is");
/**
 * Parses namespace to string.
 *
 * @param namespace - The namespace of the client
 */
const parseNamespace = (namespace) => (0, is_1.isString)(namespace) ? namespace : namespace.toString();
exports.parseNamespace = parseNamespace;
