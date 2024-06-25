"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionsProxy = void 0;
const extra_1 = require("@casl/ability/extra");
const sql_1 = require("@ucast/sql");
function convertToMongoQuery(rule) {
    const conditions = rule.conditions;
    return rule.inverted ? { $nor: [conditions] } : conditions;
}
class ConditionsProxy {
    constructor(abilities, action, subject) {
        this.abilities = abilities;
        this.action = action;
        this.subject = subject;
    }
    toAst() {
        return (0, extra_1.rulesToAST)(this.abilities, this.action, this.subject);
    }
    toSql() {
        const ast = this.toAst();
        if (ast === null || !Array.from(ast.value).length)
            return undefined;
        const interpret = (0, sql_1.createSqlInterpreter)(sql_1.allInterpreters);
        return interpret(ast, {
            ...sql_1.pg,
            joinRelation: this.joinRelation,
        });
    }
    joinRelation() {
        return false;
    }
    toMongo() {
        if (!this.getRules())
            return undefined;
        return ((0, extra_1.rulesToQuery)(this.abilities, this.action, this.subject, convertToMongoQuery) || undefined);
    }
    get() {
        return this.getRules().map((r) => r.conditions);
    }
    getRules() {
        return this.abilities.rulesFor(this.action, this.subject);
    }
}
exports.ConditionsProxy = ConditionsProxy;
//# sourceMappingURL=conditions.proxy.js.map