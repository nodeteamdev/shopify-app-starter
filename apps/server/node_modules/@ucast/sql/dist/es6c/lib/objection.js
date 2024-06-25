'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../index');

function joinRelation(relationName, query) {
  if (!query.modelClass().getRelation(relationName)) {
    return false;
  }

  query.joinRelated(relationName);
  return true;
}

const dialects = index.createDialects({
  joinRelation,
  paramPlaceholder: index.mysql.paramPlaceholder
});
function createInterpreter(interpreters) {
  const interpretSQL = index.createSqlInterpreter(interpreters);
  return (condition, query) => {
    const dialect = query.modelClass().knex().client.config.client;
    const options = dialects[dialect];

    if (!options) {
      throw new Error('Unsupported database dialect');
    }

    const [sql, params] = interpretSQL(condition, options, query);
    return query.whereRaw(sql, params);
  };
}
const interpret = createInterpreter(index.allInterpreters);

exports.createInterpreter = createInterpreter;
exports.interpret = interpret;
//# sourceMappingURL=objection.js.map
