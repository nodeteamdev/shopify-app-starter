'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sequelize = require('sequelize');
var index = require('../index');

function joinRelation(relationName, Model) {
  return Model.associations.hasOwnProperty(relationName);
}

const dialects = index.createDialects({
  joinRelation,
  paramPlaceholder: index.mysql.paramPlaceholder
});
function createInterpreter(interpreters) {
  const interpretSQL = index.createSqlInterpreter(interpreters);
  return (condition, Model) => {
    const dialect = Model.sequelize.getDialect();
    const options = dialects[dialect];

    if (!options) {
      throw new Error(`Unsupported database dialect: ${dialect}`);
    }

    const [sql, params, joins] = interpretSQL(condition, options, Model);
    return {
      include: joins.map(association => ({
        association,
        required: true
      })),
      where: sequelize.literal(sequelize.Utils.format([sql, ...params], dialect))
    };
  };
}
const interpret = createInterpreter(index.allInterpreters);

exports.createInterpreter = createInterpreter;
exports.interpret = interpret;
//# sourceMappingURL=sequelize.js.map
