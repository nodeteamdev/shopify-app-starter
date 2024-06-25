import { validateFactory } from './validate.mjs';

function fulfillmentService(config) {
    return {
        validate: validateFactory(config),
    };
}

export { fulfillmentService };
//# sourceMappingURL=index.mjs.map
