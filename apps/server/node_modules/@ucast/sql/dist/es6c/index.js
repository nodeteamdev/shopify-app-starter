'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@ucast/core');

const eq = (condition, query) => {
  return query.where(condition.field, '=', condition.value);
};
const ne = (condition, query) => {
  return query.where(condition.field, '<>', condition.value);
};
const lt = (condition, query) => {
  return query.where(condition.field, '<', condition.value);
};
const lte = (condition, query) => {
  return query.where(condition.field, '<=', condition.value);
};
const gt = (condition, query) => {
  return query.where(condition.field, '>', condition.value);
};
const gte = (condition, query) => {
  return query.where(condition.field, '>=', condition.value);
};
const exists = (condition, query) => {
  return query.whereRaw(`${query.field(condition.field)} is ${condition.value ? 'not ' : ''}null`);
};

function manyParamsOperator(name) {
  return (condition, query) => {
    return query.whereRaw(`${query.field(condition.field)} ${name}(${query.manyParams(condition.value).join(', ')})`, ...condition.value);
  };
}

const within = manyParamsOperator('in');
const nin = manyParamsOperator('not in');
const mod = (condition, query) => {
  const params = query.manyParams(condition.value);
  const sql = `mod(${query.field(condition.field)}, ${params[0]}) = ${params[1]}`;
  return query.whereRaw(sql, ...condition.value);
};
const elemMatch = (condition, query, {
  interpret
}) => {
  return query.usingFieldPrefix(condition.field, () => interpret(condition.value, query));
};
const regex = (condition, query) => {
  const sql = query.options.regexp(query.field(condition.field), query.param(), condition.value.ignoreCase);
  return query.whereRaw(sql, condition.value.source);
};

function compoundOperator(combinator, isInverted = false) {
  return (node, query, {
    interpret
  }) => {
    const childQuery = query.child();
    node.value.forEach(condition => interpret(condition, childQuery));
    return query.merge(childQuery, combinator, isInverted);
  };
}

const not = compoundOperator('and', true);
const and = compoundOperator('and');
const or = compoundOperator('or');
const nor = compoundOperator('or', true);

var interpreters = /*#__PURE__*/Object.freeze({
  __proto__: null,
  eq: eq,
  ne: ne,
  lt: lt,
  lte: lte,
  gt: gt,
  gte: gte,
  exists: exists,
  within: within,
  nin: nin,
  mod: mod,
  elemMatch: elemMatch,
  regex: regex,
  not: not,
  and: and,
  or: or,
  nor: nor
});

class Query {
  constructor(options, fieldPrefix = '', targetQuery) {
    this._params = [];
    this._sql = [];
    this._joins = [];
    this._lastPlaceholderIndex = 1;
    this.options = options;
    this._fieldPrefix = fieldPrefix;
    this._targetQuery = targetQuery;
    this._rootAlias = options.rootAlias ? `${options.escapeField(options.rootAlias)}.` : '';
  }

  field(rawName) {
    const name = this._fieldPrefix + rawName;
    const relationNameIndex = name.indexOf('.');

    if (relationNameIndex === -1) {
      return this._rootAlias + this.options.escapeField(name);
    }

    const relationName = name.slice(0, relationNameIndex);
    const field = name.slice(relationNameIndex + 1);

    if (!this.options.joinRelation(relationName, this._targetQuery)) {
      return this.options.escapeField(field);
    }

    this._joins.push(relationName);

    return `${this.options.escapeField(relationName)}.${this.options.escapeField(field)}`;
  }

  param() {
    return this.options.paramPlaceholder(this._lastPlaceholderIndex + this._params.length);
  }

  manyParams(items) {
    const startIndex = this._lastPlaceholderIndex + this._params.length;
    return items.map((_, i) => this.options.paramPlaceholder(startIndex + i));
  }

  child() {
    const query = new Query(this.options, this._fieldPrefix, this._targetQuery);
    query._lastPlaceholderIndex = this._lastPlaceholderIndex + this._params.length;
    return query;
  }

  where(field, operator, value) {
    const sql = `${this.field(field)} ${operator} ${this.param()}`;
    return this.whereRaw(sql, value);
  }

  whereRaw(sql, ...values) {
    this._sql.push(sql);

    if (values) {
      this._params.push(...values);
    }

    return this;
  }

  merge(query, operator = 'and', isInverted = false) {
    let sql = query._sql.join(` ${operator} `);

    if (sql[0] !== '(') {
      sql = `(${sql})`;
    }

    this._sql.push(`${isInverted ? 'not ' : ''}${sql}`);

    this._params.push(...query._params);

    return this;
  }

  usingFieldPrefix(prefix, callback) {
    const prevPrefix = this._fieldPrefix;

    try {
      this._fieldPrefix = `${prefix}.`;
      callback();
      return this;
    } finally {
      this._fieldPrefix = prevPrefix;
    }
  }

  toJSON() {
    return [this._sql.join(' and '), this._params, this._joins];
  }

}
function createSqlInterpreter(operators) {
  const interpret = core.createInterpreter(operators);
  return (condition, options, targetQuery) => {
    return interpret(condition, new Query(options, '', targetQuery)).toJSON();
  };
}

const allInterpreters = Object.assign({}, interpreters, {
  in: within
});

function posixRegex(field, placeholder, ignoreCase) {
  const operator = ignoreCase ? '~*' : '~';
  return `${field} ${operator} ${placeholder}`;
}

function regexp(field, placeholder) {
  return `${field} regexp ${placeholder} = 1`;
}

const questionPlaceholder = () => '?';

const $indexPlaceholder = index => `$${index}`;

const oracle = {
  regexp: posixRegex,
  paramPlaceholder: $indexPlaceholder,
  escapeField: field => `"${field}"`
};
const pg = oracle;
const mysql = {
  regexp,
  paramPlaceholder: questionPlaceholder,
  escapeField: field => `\`${field}\``
};
const sqlite = mysql;
const mssql = {
  regexp() {
    throw new Error('"regexp" operator is not supported in MSSQL');
  },

  paramPlaceholder: questionPlaceholder,
  escapeField: field => `[${field}]`
};
function createDialects(options) {
  const mssqlOptions = Object.assign({}, mssql, options);
  const pgOptions = Object.assign({}, pg, options);
  const oracleOptions = Object.assign({}, oracle, options);
  const mysqlOptions = Object.assign({}, mysql, options);
  const sqliteOptions = Object.assign({}, sqlite, options);
  return {
    mssql: mssqlOptions,
    oracle: oracleOptions,
    oracledb: oracleOptions,
    pg: pgOptions,
    postgres: pgOptions,
    mysql: mysqlOptions,
    mysql2: mysqlOptions,
    mariadb: mysqlOptions,
    sqlite: sqliteOptions,
    sqlite3: sqliteOptions
  };
}

exports.Query = Query;
exports.allInterpreters = allInterpreters;
exports.and = and;
exports.createDialects = createDialects;
exports.createSqlInterpreter = createSqlInterpreter;
exports.elemMatch = elemMatch;
exports.eq = eq;
exports.exists = exists;
exports.gt = gt;
exports.gte = gte;
exports.lt = lt;
exports.lte = lte;
exports.mod = mod;
exports.mssql = mssql;
exports.mysql = mysql;
exports.ne = ne;
exports.nin = nin;
exports.nor = nor;
exports.not = not;
exports.or = or;
exports.oracle = oracle;
exports.pg = pg;
exports.regex = regex;
exports.sqlite = sqlite;
exports.within = within;
//# sourceMappingURL=index.js.map
