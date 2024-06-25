'use strict';

var registry = require('./registry.js');
var register = require('./register.js');
var process = require('./process.js');
var validate = require('./validate.js');

function shopifyWebhooks(config) {
    const webhookRegistry = registry.registry();
    return {
        addHandlers: registry.addHandlers(config, webhookRegistry),
        getTopicsAdded: registry.getTopicsAdded(webhookRegistry),
        getHandlers: registry.getHandlers(webhookRegistry),
        register: register.register(config, webhookRegistry),
        process: process.process(config, webhookRegistry),
        validate: validate.validateFactory(config),
    };
}

exports.shopifyWebhooks = shopifyWebhooks;
//# sourceMappingURL=index.js.map
