import { ConfigInterface } from '../base-types';
export declare function fulfillmentService(config: ConfigInterface): {
    validate: ({ rawBody, ...adapterArgs }: import("..").ValidateParams) => Promise<import("..").ValidationInvalid | import("..").ValidationValid>;
};
export type FulfillmentService = ReturnType<typeof fulfillmentService>;
//# sourceMappingURL=index.d.ts.map