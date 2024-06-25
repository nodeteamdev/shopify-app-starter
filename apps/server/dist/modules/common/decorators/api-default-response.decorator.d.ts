export declare enum StatusCodes {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204
}
interface DefaultResponseOptions {
    status?: StatusCodes;
    type?: string | any;
    meta?: boolean;
    isArray?: boolean;
    summary?: string;
}
export declare function ApiDefaultResponse({ status, type, meta, isArray, summary, }: DefaultResponseOptions): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
