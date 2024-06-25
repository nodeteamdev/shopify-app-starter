import type { ShopifyClients } from '../lib';
import { ConfigInterface } from '../lib/base-types';
import { ShopifyRestResources } from './types';
export interface LoadRestResourcesParams<Resources extends ShopifyRestResources> {
    resources: Resources;
    config: ConfigInterface;
    RestClient: ShopifyClients['Rest'];
}
export declare function loadRestResources<Resources extends ShopifyRestResources>({ resources, config, RestClient, }: LoadRestResourcesParams<Resources>): Resources;
//# sourceMappingURL=load-rest-resources.d.ts.map