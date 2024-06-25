/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
import { Base, FindAllResponse } from '../../base';
import { ResourcePath, ResourceNames } from '../../types';
import { Session } from '../../../lib/session/session';
import { ApiVersion } from '../../../lib/types';
interface FindArgs {
    session: Session;
    id: number | string;
}
interface AllArgs {
    [key: string]: unknown;
    session: Session;
    since_id?: unknown;
    last_id?: unknown;
    date_min?: unknown;
    date_max?: unknown;
    date?: unknown;
    status?: unknown;
}
export declare class Payout extends Base {
    static apiVersion: ApiVersion;
    protected static hasOne: {
        [key: string]: typeof Base;
    };
    protected static hasMany: {
        [key: string]: typeof Base;
    };
    protected static paths: ResourcePath[];
    protected static resourceNames: ResourceNames[];
    static find({ session, id }: FindArgs): Promise<Payout | null>;
    static all({ session, since_id, last_id, date_min, date_max, date, status, ...otherArgs }: AllArgs): Promise<FindAllResponse<Payout>>;
    amount: string | null;
    currency: string | null;
    date: string | null;
    id: number | null;
    status: string | null;
}
export {};
//# sourceMappingURL=payout.d.ts.map