'use strict';

var validate = require('./validate.js');

function fulfillmentService(config) {
    return {
        validate: validate.validateFactory(config),
    };
}

exports.fulfillmentService = fulfillmentService;
//# sourceMappingURL=index.js.map
