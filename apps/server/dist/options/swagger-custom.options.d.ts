declare function sort(a: any, b: any): number;
declare const SwaggerCustomOptions: {
    swaggerOptions: {
        operationsSorter: typeof sort;
        tagsSorter: string;
        persistAuthorization: boolean;
        displayRequestDuration: boolean;
    };
};
export default SwaggerCustomOptions;
