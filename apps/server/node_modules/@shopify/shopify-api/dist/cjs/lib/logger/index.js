'use strict';

var compareVersions = require('compare-versions');
var types = require('../types.js');
var error = require('../error.js');
var version = require('../version.js');
var log = require('./log.js');

function logger(config) {
    const logFunction = log.log(config);
    return {
        log: logFunction,
        debug: async (message, context = {}) => logFunction(types.LogSeverity.Debug, message, context),
        info: async (message, context = {}) => logFunction(types.LogSeverity.Info, message, context),
        warning: async (message, context = {}) => logFunction(types.LogSeverity.Warning, message, context),
        error: async (message, context = {}) => logFunction(types.LogSeverity.Error, message, context),
        deprecated: deprecated(logFunction),
    };
}
function deprecated(logFunction) {
    return function (version$1, message) {
        if (compareVersions.compare(version.SHOPIFY_API_LIBRARY_VERSION, version$1, '>=')) {
            throw new error.FeatureDeprecatedError(`Feature was deprecated in version ${version$1}`);
        }
        return logFunction(types.LogSeverity.Warning, `[Deprecated | ${version$1}] ${message}`);
    };
}

exports.logger = logger;
//# sourceMappingURL=index.js.map
