export declare const ApiOkBaseResponse: ({ dto, isArray, meta, }: {
    dto?: string | any;
    isArray?: boolean;
    meta?: boolean;
}) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const ApiCreatedBaseResponse: ({ dto, isArray, }?: {
    dto?: string | any;
    isArray?: boolean;
}) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
