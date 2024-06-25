'use strict';

var decodeSessionToken = require('./decode-session-token.js');
var sessionUtils = require('./session-utils.js');

function shopifySession(config) {
    return {
        customAppSession: sessionUtils.customAppSession(config),
        getCurrentId: sessionUtils.getCurrentSessionId(config),
        getOfflineId: sessionUtils.getOfflineId(config),
        getJwtSessionId: sessionUtils.getJwtSessionId(config),
        decodeSessionToken: decodeSessionToken.decodeSessionToken(config),
    };
}

exports.shopifySession = shopifySession;
//# sourceMappingURL=index.js.map
