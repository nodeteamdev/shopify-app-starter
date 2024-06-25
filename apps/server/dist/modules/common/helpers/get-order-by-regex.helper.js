"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderByRegex = void 0;
const getOrderByRegex = (unionTypeString) => new RegExp(`^(${unionTypeString}):(asc|desc)$`);
exports.getOrderByRegex = getOrderByRegex;
//# sourceMappingURL=get-order-by-regex.helper.js.map