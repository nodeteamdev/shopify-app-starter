'use strict';

var validate = require('./validate.js');

function shopifyFlow(config) {
    return {
        validate: validate.validateFactory(config),
    };
}

exports.shopifyFlow = shopifyFlow;
//# sourceMappingURL=index.js.map
