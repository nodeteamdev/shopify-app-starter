import { ConfigInterface } from '../base-types';
import { GetEmbeddedAppUrlParams } from './types';
export type GetEmbeddedAppUrl = (params: GetEmbeddedAppUrlParams) => Promise<string>;
export type BuildEmbeddedAppUrl = (host: string) => string;
export declare function getEmbeddedAppUrl(config: ConfigInterface): GetEmbeddedAppUrl;
export declare function buildEmbeddedAppUrl(config: ConfigInterface): BuildEmbeddedAppUrl;
//# sourceMappingURL=get-embedded-app-url.d.ts.map