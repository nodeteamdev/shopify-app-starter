import { Condition } from '@ucast/core';
import { Model, QueryBuilder } from 'objection';
import { SqlOperator } from '../index';
export declare function createInterpreter(interpreters: Record<string, SqlOperator<any>>): <T extends Model>(condition: Condition, query: QueryBuilder<T, T[]>) => QueryBuilder<T, T[]>;
export declare const interpret: <T extends Model>(condition: Condition, query: QueryBuilder<T, T[]>) => QueryBuilder<T, T[]>;
