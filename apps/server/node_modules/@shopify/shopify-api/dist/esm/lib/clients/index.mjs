import { graphqlClientClass } from './admin/graphql/client.mjs';
import { restClientClass } from './admin/rest/client.mjs';
import { storefrontClientClass } from './storefront/client.mjs';
import { graphqlProxy } from './graphql_proxy/graphql_proxy.mjs';

function clientClasses(config) {
    return {
        // We don't pass in the HttpClient because the RestClient inherits from it, and goes through the same setup process
        Rest: restClientClass({ config }),
        Graphql: graphqlClientClass({ config }),
        Storefront: storefrontClientClass({ config }),
        graphqlProxy: graphqlProxy(config),
    };
}

export { clientClasses };
//# sourceMappingURL=index.mjs.map
