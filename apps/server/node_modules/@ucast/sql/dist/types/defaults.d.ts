export declare const allInterpreters: {
    in: import("./interpreter").SqlOperator<import("@ucast/core").FieldCondition<unknown[]>>;
    eq: import("./interpreter").SqlOperator<import("@ucast/core").FieldCondition<unknown>>;
    ne: import("./interpreter").SqlOperator<import("@ucast/core").FieldCondition<unknown>>;
    lt: import("./interpreter").SqlOperator<import("@ucast/core").FieldCondition<string | number | Date>>;
    lte: import("./interpreter").SqlOperator<import("@ucast/core").FieldCondition<string | number | Date>>;
    gt: import("./interpreter").SqlOperator<import("@ucast/core").FieldCondition<string | number | Date>>;
    gte: import("./interpreter").SqlOperator<import("@ucast/core").FieldCondition<string | number | Date>>;
    exists: import("./interpreter").SqlOperator<import("@ucast/core").FieldCondition<string | number | Date>>;
    within: import("./interpreter").SqlOperator<import("@ucast/core").FieldCondition<unknown[]>>;
    nin: import("./interpreter").SqlOperator<import("@ucast/core").FieldCondition<unknown[]>>;
    mod: import("./interpreter").SqlOperator<import("@ucast/core").FieldCondition<[number, number]>>;
    elemMatch: import("./interpreter").SqlOperator<import("@ucast/core").FieldCondition<import("@ucast/core").Condition<unknown>>>;
    regex: import("./interpreter").SqlOperator<import("@ucast/core").FieldCondition<RegExp>>;
    not: import("./interpreter").SqlOperator<import("@ucast/core").CompoundCondition<import("@ucast/core").Condition<unknown>>>;
    and: import("./interpreter").SqlOperator<import("@ucast/core").CompoundCondition<import("@ucast/core").Condition<unknown>>>;
    or: import("./interpreter").SqlOperator<import("@ucast/core").CompoundCondition<import("@ucast/core").Condition<unknown>>>;
    nor: import("./interpreter").SqlOperator<import("@ucast/core").CompoundCondition<import("@ucast/core").Condition<unknown>>>;
};
