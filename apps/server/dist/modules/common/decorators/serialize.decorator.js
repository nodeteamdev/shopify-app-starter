"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serialize = exports.setSerializeType = exports.getSerializeType = void 0;
const common_1 = require("@nestjs/common");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const SERIALIZE_TYPE_KEY = 'SerializeTypeKey';
function getSerializeType(target) {
    return Reflect.getMetadata(SERIALIZE_TYPE_KEY, target);
}
exports.getSerializeType = getSerializeType;
function setSerializeType(target, serializeType) {
    Reflect.defineMetadata(SERIALIZE_TYPE_KEY, serializeType, target);
}
exports.setSerializeType = setSerializeType;
const Serialize = (entity) => (proto, propName, descriptor) => {
    setSerializeType(proto[propName], entity);
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor)(proto, propName, descriptor);
    (0, common_1.UseInterceptors)(serialize_interceptor_1.SerializeInterceptor)(proto, propName, descriptor);
};
exports.Serialize = Serialize;
//# sourceMappingURL=serialize.decorator.js.map