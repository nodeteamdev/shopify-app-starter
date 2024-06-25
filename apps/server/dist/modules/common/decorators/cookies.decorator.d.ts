export type CookiesType = {
    readonly [key: string]: string;
    readonly userId?: string;
    readonly webShopId?: string;
};
export declare const Cookies: (...dataOrPipes: (string | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
