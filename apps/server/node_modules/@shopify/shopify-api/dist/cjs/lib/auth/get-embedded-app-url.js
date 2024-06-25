'use strict';

var error = require('../error.js');
var index = require('../../runtime/http/index.js');
var shopValidator = require('../utils/shop-validator.js');
var decodeHost = require('./decode-host.js');

function getEmbeddedAppUrl(config) {
    return async ({ ...adapterArgs }) => {
        const request = await index.abstractConvertRequest(adapterArgs);
        if (!request) {
            throw new error.MissingRequiredArgument('getEmbeddedAppUrl requires a request object argument');
        }
        if (!request.url) {
            throw new error.InvalidRequestError('Request does not contain a URL');
        }
        const url = new URL(request.url, `https://${request.headers.host}`);
        const host = url.searchParams.get('host');
        if (typeof host !== 'string') {
            throw new error.InvalidRequestError('Request does not contain a host query parameter');
        }
        return buildEmbeddedAppUrl(config)(host);
    };
}
function buildEmbeddedAppUrl(config) {
    return (host) => {
        shopValidator.sanitizeHost()(host, true);
        const decodedHost = decodeHost.decodeHost(host);
        return `https://${decodedHost}/apps/${config.apiKey}`;
    };
}

exports.buildEmbeddedAppUrl = buildEmbeddedAppUrl;
exports.getEmbeddedAppUrl = getEmbeddedAppUrl;
//# sourceMappingURL=get-embedded-app-url.js.map
