'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../index');

function joinRelation(relationName, query) {
  const privateQuery = query;
  const meta = privateQuery.metadata.get(privateQuery.entityName);
  const prop = meta.properties[relationName];

  if (prop && prop.reference) {
    query.join(`${query.alias}.${relationName}`, relationName);
    return true;
  }

  return false;
}

const dialects = index.createDialects({
  joinRelation,
  paramPlaceholder: index.mysql.paramPlaceholder
});
function createInterpreter(interpreters) {
  const interpretSQL = index.createSqlInterpreter(interpreters);
  return (condition, query) => {
    const dialect = query.driver.config.get('type');
    const options = dialects[dialect];

    if (!options) {
      throw new Error(`Unsupported database dialect: ${dialect}`);
    }

    const [sql, params] = interpretSQL(condition, options, query);
    return query.where(sql, params);
  };
}
const interpret = createInterpreter(index.allInterpreters);

exports.createInterpreter = createInterpreter;
exports.interpret = interpret;
//# sourceMappingURL=mikro-orm.js.map
