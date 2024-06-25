import { Condition } from '@ucast/core';
import { ModelType, Utils } from 'sequelize';
import { SqlOperator } from '../index';
export declare function createInterpreter(interpreters: Record<string, SqlOperator<any>>): (condition: Condition, Model: ModelType) => {
    include: {
        association: string;
        required: boolean;
    }[];
    where: Utils.Literal;
};
export declare const interpret: (condition: Condition, Model: ModelType) => {
    include: {
        association: string;
        required: boolean;
    }[];
    where: Utils.Literal;
};
