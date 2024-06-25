'use strict';

var jose = require('jose');
var error = require('../error.js');
var getHmacKey = require('../utils/get-hmac-key.js');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var jose__namespace = /*#__PURE__*/_interopNamespaceDefault(jose);

const JWT_PERMITTED_CLOCK_TOLERANCE = 10;
function decodeSessionToken(config) {
    return async (token, { checkAudience = true } = {}) => {
        let payload;
        try {
            payload = (await jose__namespace.jwtVerify(token, getHmacKey.getHMACKey(config.apiSecretKey), {
                algorithms: ['HS256'],
                clockTolerance: JWT_PERMITTED_CLOCK_TOLERANCE,
            })).payload;
        }
        catch (error$1) {
            throw new error.InvalidJwtError(`Failed to parse session token '${token}': ${error$1.message}`);
        }
        // The exp and nbf fields are validated by the JWT library
        if (checkAudience && payload.aud !== config.apiKey) {
            throw new error.InvalidJwtError('Session token had invalid API key');
        }
        return payload;
    };
}

exports.decodeSessionToken = decodeSessionToken;
//# sourceMappingURL=decode-session-token.js.map
