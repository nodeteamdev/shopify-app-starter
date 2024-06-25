"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sort(a, b) {
    const order = {
        post: 0,
        get: 1,
        patch: 2,
        put: 3,
        delete: 4,
    };
    const aOrder = order[a.get('method')];
    const bOrder = order[b.get('method')];
    if (aOrder !== bOrder)
        return aOrder - bOrder;
    const aPath = a.get('path');
    const bPath = b.get('path');
    const aBlocks = aPath.split('/').length;
    const bBlocks = bPath.split('/').length;
    if (aBlocks !== bBlocks)
        return aBlocks > bBlocks ? 1 : -1;
    return aPath > bPath ? 1 : -1;
}
const SwaggerCustomOptions = {
    swaggerOptions: {
        operationsSorter: sort,
        tagsSorter: 'alpha',
        persistAuthorization: true,
        displayRequestDuration: true,
    },
};
exports.default = SwaggerCustomOptions;
//# sourceMappingURL=swagger-custom.options.js.map