/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
import { Base, FindAllResponse } from '../../base';
import { ResourcePath, ResourceNames } from '../../types';
import { Session } from '../../../lib/session/session';
import { ApiVersion } from '../../../lib/types';
interface AllArgs {
    [key: string]: unknown;
    session: Session;
}
export declare class DeprecatedApiCall extends Base {
    static apiVersion: ApiVersion;
    protected static hasOne: {
        [key: string]: typeof Base;
    };
    protected static hasMany: {
        [key: string]: typeof Base;
    };
    protected static paths: ResourcePath[];
    protected static resourceNames: ResourceNames[];
    static all({ session, ...otherArgs }: AllArgs): Promise<FindAllResponse<DeprecatedApiCall>>;
    data_updated_at: string | null;
    deprecated_api_calls: {
        [key: string]: unknown;
    }[] | null;
}
export {};
//# sourceMappingURL=deprecated_api_call.d.ts.map