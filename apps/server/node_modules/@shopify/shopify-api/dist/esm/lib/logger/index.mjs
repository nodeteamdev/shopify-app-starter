import { compare } from 'compare-versions';
import { LogSeverity } from '../types.mjs';
import { FeatureDeprecatedError } from '../error.mjs';
import { SHOPIFY_API_LIBRARY_VERSION } from '../version.mjs';
import { log } from './log.mjs';

function logger(config) {
    const logFunction = log(config);
    return {
        log: logFunction,
        debug: async (message, context = {}) => logFunction(LogSeverity.Debug, message, context),
        info: async (message, context = {}) => logFunction(LogSeverity.Info, message, context),
        warning: async (message, context = {}) => logFunction(LogSeverity.Warning, message, context),
        error: async (message, context = {}) => logFunction(LogSeverity.Error, message, context),
        deprecated: deprecated(logFunction),
    };
}
function deprecated(logFunction) {
    return function (version, message) {
        if (compare(SHOPIFY_API_LIBRARY_VERSION, version, '>=')) {
            throw new FeatureDeprecatedError(`Feature was deprecated in version ${version}`);
        }
        return logFunction(LogSeverity.Warning, `[Deprecated | ${version}] ${message}`);
    };
}

export { logger };
//# sourceMappingURL=index.mjs.map
