"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializeInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const serialize_decorator_1 = require("../decorators/serialize.decorator");
const getSerializer = (Entity) => (data) => Object.assign(new Entity(), data);
let SerializeInterceptor = class SerializeInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((value) => {
            if (typeof value !== 'object' || value === null) {
                return value;
            }
            const SerializeType = (0, serialize_decorator_1.getSerializeType)(context.getHandler());
            const serializer = getSerializer(SerializeType);
            function serialize(data) {
                return data instanceof Array
                    ? data.map(serializer)
                    : serializer(data);
            }
            if (value.meta) {
                return {
                    ...value,
                    data: serialize(value.data),
                };
            }
            return serialize(value);
        }));
    }
};
exports.SerializeInterceptor = SerializeInterceptor;
exports.SerializeInterceptor = SerializeInterceptor = __decorate([
    (0, common_1.Injectable)()
], SerializeInterceptor);
//# sourceMappingURL=serialize.interceptor.js.map