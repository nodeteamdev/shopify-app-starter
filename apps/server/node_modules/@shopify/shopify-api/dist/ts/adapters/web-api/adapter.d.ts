import type { Headers as ShopifyHeaders, AdapterArgs, NormalizedResponse, NormalizedRequest } from '../../runtime';
interface WebApiAdapterArgs extends AdapterArgs {
    rawRequest: Request;
}
export declare function webApiConvertRequest(adapterArgs: WebApiAdapterArgs): Promise<NormalizedRequest>;
export declare function webApiConvertHeaders(headers: ShopifyHeaders, _adapterArgs: WebApiAdapterArgs): Promise<Headers>;
export declare function webApiConvertResponse(resp: NormalizedResponse, adapterArgs: WebApiAdapterArgs): Promise<Response>;
export declare function webApiRuntimeString(): string;
export {};
//# sourceMappingURL=adapter.d.ts.map