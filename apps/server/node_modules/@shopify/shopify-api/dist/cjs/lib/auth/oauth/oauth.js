'use strict';

var isbot = require('isbot');
var common = require('../../clients/common.js');
var processedQuery = require('../../utils/processed-query.js');
var error = require('../../error.js');
var hmacValidator = require('../../utils/hmac-validator.js');
var shopValidator = require('../../utils/shop-validator.js');
var index = require('../../../runtime/http/index.js');
var index$1 = require('../../logger/index.js');
var types$1 = require('../../clients/types.js');
var fetchRequest = require('../../utils/fetch-request.js');
var types = require('./types.js');
var nonce = require('./nonce.js');
var safeCompare = require('./safe-compare.js');
var createSession = require('./create-session.js');
var cookies = require('../../../runtime/http/cookies.js');

const logForBot = ({ request, log, func }) => {
    log.debug(`Possible bot request to auth ${func}: `, {
        userAgent: request.headers['User-Agent'],
    });
};
function begin(config) {
    return async ({ shop, callbackPath, isOnline, ...adapterArgs }) => {
        throwIfCustomStoreApp(config.isCustomStoreApp, 'Cannot perform OAuth for private apps');
        const log = index$1.logger(config);
        log.info('Beginning OAuth', { shop, isOnline, callbackPath });
        const request = await index.abstractConvertRequest(adapterArgs);
        const response = await index.abstractConvertIncomingResponse(adapterArgs);
        let userAgent = request.headers['User-Agent'];
        if (Array.isArray(userAgent)) {
            userAgent = userAgent[0];
        }
        if (isbot.isbot(userAgent)) {
            logForBot({ request, log, func: 'begin' });
            response.statusCode = 410;
            return index.abstractConvertResponse(response, adapterArgs);
        }
        const cookies$1 = new cookies.Cookies(request, response, {
            keys: [config.apiSecretKey],
            secure: true,
        });
        const state = nonce.nonce();
        await cookies$1.setAndSign(types.STATE_COOKIE_NAME, state, {
            expires: new Date(Date.now() + 60000),
            sameSite: 'lax',
            secure: true,
            path: callbackPath,
        });
        const scopes = config.scopes ? config.scopes.toString() : '';
        const query = {
            client_id: config.apiKey,
            scope: scopes,
            redirect_uri: `${config.hostScheme}://${config.hostName}${callbackPath}`,
            state,
            'grant_options[]': isOnline ? 'per-user' : '',
        };
        const processedQuery$1 = new processedQuery.default();
        processedQuery$1.putAll(query);
        const cleanShop = shopValidator.sanitizeShop(config)(shop, true);
        const redirectUrl = `https://${cleanShop}/admin/oauth/authorize${processedQuery$1.stringify()}`;
        response.statusCode = 302;
        response.statusText = 'Found';
        response.headers = {
            ...response.headers,
            ...cookies$1.response.headers,
            Location: redirectUrl,
        };
        log.debug(`OAuth started, redirecting to ${redirectUrl}`, { shop, isOnline });
        return index.abstractConvertResponse(response, adapterArgs);
    };
}
function callback(config) {
    return async function callback({ ...adapterArgs }) {
        throwIfCustomStoreApp(config.isCustomStoreApp, 'Cannot perform OAuth for private apps');
        const log = index$1.logger(config);
        const request = await index.abstractConvertRequest(adapterArgs);
        const query = new URL(request.url, `${config.hostScheme}://${config.hostName}`).searchParams;
        const shop = query.get('shop');
        const response = {};
        let userAgent = request.headers['User-Agent'];
        if (Array.isArray(userAgent)) {
            userAgent = userAgent[0];
        }
        if (isbot.isbot(userAgent)) {
            logForBot({ request, log, func: 'callback' });
            throw new error.BotActivityDetected('Invalid OAuth callback initiated by bot');
        }
        log.info('Completing OAuth', { shop });
        const cookies$1 = new cookies.Cookies(request, response, {
            keys: [config.apiSecretKey],
            secure: true,
        });
        const stateFromCookie = await cookies$1.getAndVerify(types.STATE_COOKIE_NAME);
        cookies$1.deleteCookie(types.STATE_COOKIE_NAME);
        if (!stateFromCookie) {
            log.error('Could not find OAuth cookie', { shop });
            throw new error.CookieNotFound(`Cannot complete OAuth process. Could not find an OAuth cookie for shop url: ${shop}`);
        }
        const authQuery = Object.fromEntries(query.entries());
        if (!(await validQuery({ config, query: authQuery, stateFromCookie }))) {
            log.error('Invalid OAuth callback', { shop, stateFromCookie });
            throw new error.InvalidOAuthError('Invalid OAuth callback.');
        }
        log.debug('OAuth request is valid, requesting access token', { shop });
        const body = {
            client_id: config.apiKey,
            client_secret: config.apiSecretKey,
            code: query.get('code'),
        };
        const cleanShop = shopValidator.sanitizeShop(config)(query.get('shop'), true);
        const postResponse = await fetchRequest.fetchRequestFactory(config)(`https://${cleanShop}/admin/oauth/access_token`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': types$1.DataType.JSON,
                Accept: types$1.DataType.JSON,
            },
        });
        if (!postResponse.ok) {
            common.throwFailedRequest(await postResponse.json(), false, postResponse);
        }
        const session = createSession.createSession({
            accessTokenResponse: await postResponse.json(),
            shop: cleanShop,
            state: stateFromCookie,
            config,
        });
        if (!config.isEmbeddedApp) {
            await cookies$1.setAndSign(types.SESSION_COOKIE_NAME, session.id, {
                expires: session.expires,
                sameSite: 'lax',
                secure: true,
                path: '/',
            });
        }
        return {
            headers: (await index.abstractConvertHeaders(cookies$1.response.headers, adapterArgs)),
            session,
        };
    };
}
async function validQuery({ config, query, stateFromCookie, }) {
    return ((await hmacValidator.validateHmac(config)(query)) &&
        safeCompare.safeCompare(query.state, stateFromCookie));
}
function throwIfCustomStoreApp(isCustomStoreApp, message) {
    if (isCustomStoreApp) {
        throw new error.PrivateAppError(message);
    }
}

exports.begin = begin;
exports.callback = callback;
//# sourceMappingURL=oauth.js.map
