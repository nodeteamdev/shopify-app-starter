import { Condition } from '@ucast/core';
import { SelectQueryBuilder } from 'typeorm';
import { SqlOperator } from '../index';
export declare function createInterpreter(interpreters: Record<string, SqlOperator<any>>): <Entity>(condition: Condition, query: SelectQueryBuilder<Entity>) => SelectQueryBuilder<Entity>;
export declare const interpret: <Entity>(condition: Condition, query: SelectQueryBuilder<Entity>) => SelectQueryBuilder<Entity>;
