import { Condition } from '@ucast/core';
import { QueryBuilder, AnyEntity } from 'mikro-orm';
import { SqlOperator } from '../index';
export declare function createInterpreter(interpreters: Record<string, SqlOperator<any>>): <T extends AnyEntity<T, keyof T>>(condition: Condition, query: QueryBuilder<T>) => QueryBuilder<T>;
export declare const interpret: <T extends AnyEntity<T, keyof T>>(condition: Condition, query: QueryBuilder<T>) => QueryBuilder<T>;
