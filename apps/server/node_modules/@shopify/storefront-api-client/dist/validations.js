'use strict';

var constants = require('./constants.js');

function validatePrivateAccessTokenUsage(privateAccessToken) {
    if (privateAccessToken && typeof window !== 'undefined') {
        throw new Error(`${constants.CLIENT}: private access tokens and headers should only be used in a server-to-server implementation. Use the public API access token in nonserver environments.`);
    }
}
function validateRequiredAccessTokens(publicAccessToken, privateAccessToken) {
    if (!publicAccessToken && !privateAccessToken) {
        throw new Error(`${constants.CLIENT}: a public or private access token must be provided`);
    }
    if (publicAccessToken && privateAccessToken) {
        throw new Error(`${constants.CLIENT}: only provide either a public or private access token`);
    }
}

exports.validatePrivateAccessTokenUsage = validatePrivateAccessTokenUsage;
exports.validateRequiredAccessTokens = validateRequiredAccessTokens;
//# sourceMappingURL=validations.js.map
