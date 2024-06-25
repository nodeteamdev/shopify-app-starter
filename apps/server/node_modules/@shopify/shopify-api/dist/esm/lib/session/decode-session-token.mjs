import * as jose from 'jose';
import { InvalidJwtError } from '../error.mjs';
import { getHMACKey } from '../utils/get-hmac-key.mjs';

const JWT_PERMITTED_CLOCK_TOLERANCE = 10;
function decodeSessionToken(config) {
    return async (token, { checkAudience = true } = {}) => {
        let payload;
        try {
            payload = (await jose.jwtVerify(token, getHMACKey(config.apiSecretKey), {
                algorithms: ['HS256'],
                clockTolerance: JWT_PERMITTED_CLOCK_TOLERANCE,
            })).payload;
        }
        catch (error) {
            throw new InvalidJwtError(`Failed to parse session token '${token}': ${error.message}`);
        }
        // The exp and nbf fields are validated by the JWT library
        if (checkAudience && payload.aud !== config.apiKey) {
            throw new InvalidJwtError('Session token had invalid API key');
        }
        return payload;
    };
}

export { decodeSessionToken };
//# sourceMappingURL=decode-session-token.mjs.map
