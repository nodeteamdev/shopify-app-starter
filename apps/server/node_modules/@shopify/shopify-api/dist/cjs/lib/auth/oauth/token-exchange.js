'use strict';

var common = require('../../clients/common.js');
var decodeSessionToken = require('../../session/decode-session-token.js');
var shopValidator = require('../../utils/shop-validator.js');
var types = require('../../clients/types.js');
var fetchRequest = require('../../utils/fetch-request.js');
var createSession = require('./create-session.js');

exports.RequestedTokenType = void 0;
(function (RequestedTokenType) {
    RequestedTokenType["OnlineAccessToken"] = "urn:shopify:params:oauth:token-type:online-access-token";
    RequestedTokenType["OfflineAccessToken"] = "urn:shopify:params:oauth:token-type:offline-access-token";
})(exports.RequestedTokenType || (exports.RequestedTokenType = {}));
const TokenExchangeGrantType = 'urn:ietf:params:oauth:grant-type:token-exchange';
const IdTokenType = 'urn:ietf:params:oauth:token-type:id_token';
function tokenExchange(config) {
    return async ({ shop, sessionToken, requestedTokenType, }) => {
        await decodeSessionToken.decodeSessionToken(config)(sessionToken);
        const body = {
            client_id: config.apiKey,
            client_secret: config.apiSecretKey,
            grant_type: TokenExchangeGrantType,
            subject_token: sessionToken,
            subject_token_type: IdTokenType,
            requested_token_type: requestedTokenType,
        };
        const cleanShop = shopValidator.sanitizeShop(config)(shop, true);
        const postResponse = await fetchRequest.fetchRequestFactory(config)(`https://${cleanShop}/admin/oauth/access_token`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': types.DataType.JSON,
                Accept: types.DataType.JSON,
            },
        });
        if (!postResponse.ok) {
            common.throwFailedRequest(await postResponse.json(), false, postResponse);
        }
        return {
            session: createSession.createSession({
                accessTokenResponse: await postResponse.json(),
                shop: cleanShop,
                // We need to keep this as an empty string as our template DB schemas have this required
                state: '',
                config,
            }),
        };
    };
}

exports.tokenExchange = tokenExchange;
//# sourceMappingURL=token-exchange.js.map
