import { LogContent } from '@shopify/admin-api-client';
import { ConfigInterface } from '../base-types';
export declare function getUserAgent(config: ConfigInterface): string;
export declare function clientLoggerFactory(config: ConfigInterface): (logContent: LogContent) => void;
export declare function throwFailedRequest(body: any, atMaxRetries: boolean, response?: Response): never;
//# sourceMappingURL=common.d.ts.map