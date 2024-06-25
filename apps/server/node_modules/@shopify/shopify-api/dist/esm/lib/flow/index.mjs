import { validateFactory } from './validate.mjs';

function shopifyFlow(config) {
    return {
        validate: validateFactory(config),
    };
}

export { shopifyFlow };
//# sourceMappingURL=index.mjs.map
