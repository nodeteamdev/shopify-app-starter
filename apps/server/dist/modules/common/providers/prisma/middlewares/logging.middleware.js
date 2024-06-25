"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
function loggingMiddleware({ logger, logMessage, logLevel } = {
    logger: console,
    logLevel: 'debug',
}) {
    return async (params, next) => {
        const before = Date.now();
        const result = await next(params);
        const after = Date.now();
        const executionTime = after - before;
        if (logMessage) {
            logger[logLevel](logMessage({
                model: params.model,
                action: params.action,
                before,
                after,
                executionTime,
            }));
        }
        else {
            logger[logLevel](`Prisma Query ${params.model}.${params.action} took ${executionTime}ms`);
        }
        return result;
    };
}
exports.loggingMiddleware = loggingMiddleware;
//# sourceMappingURL=logging.middleware.js.map