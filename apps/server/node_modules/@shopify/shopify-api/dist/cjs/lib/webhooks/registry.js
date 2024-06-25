'use strict';

var error = require('../error.js');
var index = require('../logger/index.js');
var types = require('./types.js');

function registry() {
    return {};
}
function topicForStorage(topic) {
    return topic.toUpperCase().replace(/\/|\./g, '_');
}
function addHandlers(config, webhookRegistry) {
    return function addHandlers(handlersToAdd) {
        for (const [topic, handlers] of Object.entries(handlersToAdd)) {
            const topicKey = topicForStorage(topic);
            if (Array.isArray(handlers)) {
                for (const handler of handlers) {
                    mergeOrAddHandler(config, webhookRegistry, topicKey, handler);
                }
            }
            else {
                mergeOrAddHandler(config, webhookRegistry, topicKey, handlers);
            }
        }
    };
}
function getTopicsAdded(webhookRegistry) {
    return function getTopicsAdded() {
        return Object.keys(webhookRegistry);
    };
}
function getHandlers(webhookRegistry) {
    return function getHandlers(topic) {
        return webhookRegistry[topicForStorage(topic)] || [];
    };
}
function handlerIdentifier(config, handler) {
    const prefix = handler.deliveryMethod;
    switch (handler.deliveryMethod) {
        case types.DeliveryMethod.Http:
            return `${prefix}_${addHostToCallbackUrl(config, handler.callbackUrl)}`;
        case types.DeliveryMethod.EventBridge:
            return `${prefix}_${handler.arn}`;
        case types.DeliveryMethod.PubSub:
            return `${prefix}_${handler.pubSubProject}:${handler.pubSubTopic}`;
        default:
            throw new error.InvalidDeliveryMethodError(`Unrecognized delivery method '${handler.deliveryMethod}'`);
    }
}
function addHostToCallbackUrl(config, callbackUrl) {
    if (callbackUrl.startsWith('/')) {
        return `${config.hostScheme}://${config.hostName}${callbackUrl}`;
    }
    else {
        return callbackUrl;
    }
}
function mergeOrAddHandler(config, webhookRegistry, topic, handler) {
    const log = index.logger(config);
    handler.includeFields?.sort();
    handler.metafieldNamespaces?.sort();
    if (!(topic in webhookRegistry)) {
        webhookRegistry[topic] = [handler];
        return;
    }
    const identifier = handlerIdentifier(config, handler);
    for (const index in webhookRegistry[topic]) {
        if (!Object.prototype.hasOwnProperty.call(webhookRegistry[topic], index)) {
            continue;
        }
        const existingHandler = webhookRegistry[topic][index];
        const existingIdentifier = handlerIdentifier(config, existingHandler);
        if (identifier !== existingIdentifier) {
            continue;
        }
        if (handler.deliveryMethod === types.DeliveryMethod.Http) {
            log.info(`Detected multiple handlers for '${topic}', webhooks.process will call them sequentially`);
            break;
        }
        else {
            throw new error.InvalidDeliveryMethodError(`Can only add multiple handlers for a topic when deliveryMethod is Http. Please be sure that you used addHandler method once after creating ShopifyApi instance in your app.  Invalid handler: ${JSON.stringify(handler)}`);
        }
    }
    webhookRegistry[topic].push(handler);
}

exports.addHandlers = addHandlers;
exports.addHostToCallbackUrl = addHostToCallbackUrl;
exports.getHandlers = getHandlers;
exports.getTopicsAdded = getTopicsAdded;
exports.handlerIdentifier = handlerIdentifier;
exports.registry = registry;
exports.topicForStorage = topicForStorage;
//# sourceMappingURL=registry.js.map
