import { StorefrontApiClient, StorefrontOperations, ClientResponse, ReturnData } from '@shopify/storefront-api-client';
import { ApiVersion } from '../../types';
import type { GraphqlClientParams, GraphqlParams, GraphqlQueryOptions, RequestReturn } from '../types';
import { ConfigInterface } from '../../base-types';
import { Session } from '../../session/session';
interface GraphqlClientClassParams {
    config: ConfigInterface;
}
export declare class StorefrontClient {
    static config: ConfigInterface;
    readonly session: Session;
    readonly client: StorefrontApiClient;
    readonly apiVersion?: ApiVersion;
    constructor(params: GraphqlClientParams);
    query<T = undefined>(params: GraphqlParams): Promise<RequestReturn<T>>;
    request<T = undefined, Operation extends keyof Operations = string, Operations extends StorefrontOperations = StorefrontOperations>(operation: Operation, options?: GraphqlQueryOptions<Operation, Operations>): Promise<ClientResponse<T extends undefined ? ReturnData<Operation, Operations> : T>>;
    private storefrontClass;
}
export declare function storefrontClientClass(params: GraphqlClientClassParams): typeof StorefrontClient;
export {};
//# sourceMappingURL=client.d.ts.map