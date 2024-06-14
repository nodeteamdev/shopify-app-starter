import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '@interceptors/serialize.interceptor';

const SERIALIZE_TYPE_KEY = 'SerializeTypeKey';

export function getSerializeType(target) {
  return Reflect.getMetadata(SERIALIZE_TYPE_KEY, target);
}

export function setSerializeType(target, serializeType) {
  Reflect.defineMetadata(SERIALIZE_TYPE_KEY, serializeType, target);
}

export const Serialize = (entity: any) => (proto, propName, descriptor) => {
  setSerializeType(proto[propName], entity);
  UseInterceptors(ClassSerializerInterceptor)(proto, propName, descriptor);
  UseInterceptors(SerializeInterceptor)(proto, propName, descriptor);
};
