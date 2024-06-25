/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
import { Base, FindAllResponse } from '../../base';
import { ResourcePath, ResourceNames } from '../../types';
import { Session } from '../../../lib/session/session';
import { ApiVersion } from '../../../lib/types';
import { Country } from './country';
import { Province } from './province';
interface AllArgs {
    [key: string]: unknown;
    session: Session;
    fields?: unknown;
}
export declare class ShippingZone extends Base {
    static apiVersion: ApiVersion;
    protected static hasOne: {
        [key: string]: typeof Base;
    };
    protected static hasMany: {
        [key: string]: typeof Base;
    };
    protected static paths: ResourcePath[];
    protected static resourceNames: ResourceNames[];
    static all({ session, fields, ...otherArgs }: AllArgs): Promise<FindAllResponse<ShippingZone>>;
    carrier_shipping_rate_providers: unknown | null;
    countries: Country[] | null | {
        [key: string]: any;
    };
    id: number | null;
    location_group_id: string | null;
    name: string | null;
    price_based_shipping_rates: {
        [key: string]: unknown;
    }[] | null;
    profile_id: string | null;
    provinces: Province[] | null | {
        [key: string]: any;
    };
    weight_based_shipping_rates: {
        [key: string]: unknown;
    }[] | null;
}
export {};
//# sourceMappingURL=shipping_zone.d.ts.map