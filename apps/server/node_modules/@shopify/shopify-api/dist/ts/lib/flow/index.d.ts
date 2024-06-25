import { ConfigInterface } from '../base-types';
export declare function shopifyFlow(config: ConfigInterface): {
    validate: ({ rawBody, ...adapterArgs }: import("..").ValidateParams) => Promise<import("..").ValidationInvalid | import("..").ValidationValid>;
};
export type ShopifyFlow = ReturnType<typeof shopifyFlow>;
//# sourceMappingURL=index.d.ts.map