import { AnyAbility, Subject } from '@casl/ability';
import { Condition, MongoQuery } from '@ucast/mongo2js';
export type SqlConditions = [string, unknown[], string[]];
export declare class ConditionsProxy {
    private abilities;
    private action;
    private subject;
    constructor(abilities: AnyAbility, action: string, subject: Subject);
    toAst(): Condition | null;
    toSql(): SqlConditions | undefined;
    joinRelation(): boolean;
    toMongo(): MongoQuery | undefined;
    get(): MongoQuery[];
    private getRules;
}
