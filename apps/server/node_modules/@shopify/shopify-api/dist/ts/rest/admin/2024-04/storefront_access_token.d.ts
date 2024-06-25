/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
import { Base, FindAllResponse } from '../../base';
import { ResourcePath, ResourceNames } from '../../types';
import { Session } from '../../../lib/session/session';
import { ApiVersion } from '../../../lib/types';
interface DeleteArgs {
    session: Session;
    id: number | string;
}
interface AllArgs {
    [key: string]: unknown;
    session: Session;
}
export declare class StorefrontAccessToken extends Base {
    static apiVersion: ApiVersion;
    protected static hasOne: {
        [key: string]: typeof Base;
    };
    protected static hasMany: {
        [key: string]: typeof Base;
    };
    protected static paths: ResourcePath[];
    protected static resourceNames: ResourceNames[];
    static delete({ session, id }: DeleteArgs): Promise<unknown>;
    static all({ session, ...otherArgs }: AllArgs): Promise<FindAllResponse<StorefrontAccessToken>>;
    title: string | null;
    access_scope: string | null;
    access_token: string | null;
    created_at: string | null;
    id: number | null;
}
export {};
//# sourceMappingURL=storefront_access_token.d.ts.map