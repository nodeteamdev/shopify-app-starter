import { MissingRequiredArgument, InvalidRequestError } from '../error.mjs';
import { abstractConvertRequest } from '../../runtime/http/index.mjs';
import { sanitizeHost } from '../utils/shop-validator.mjs';
import { decodeHost } from './decode-host.mjs';

function getEmbeddedAppUrl(config) {
    return async ({ ...adapterArgs }) => {
        const request = await abstractConvertRequest(adapterArgs);
        if (!request) {
            throw new MissingRequiredArgument('getEmbeddedAppUrl requires a request object argument');
        }
        if (!request.url) {
            throw new InvalidRequestError('Request does not contain a URL');
        }
        const url = new URL(request.url, `https://${request.headers.host}`);
        const host = url.searchParams.get('host');
        if (typeof host !== 'string') {
            throw new InvalidRequestError('Request does not contain a host query parameter');
        }
        return buildEmbeddedAppUrl(config)(host);
    };
}
function buildEmbeddedAppUrl(config) {
    return (host) => {
        sanitizeHost()(host, true);
        const decodedHost = decodeHost(host);
        return `https://${decodedHost}/apps/${config.apiKey}`;
    };
}

export { buildEmbeddedAppUrl, getEmbeddedAppUrl };
//# sourceMappingURL=get-embedded-app-url.mjs.map
