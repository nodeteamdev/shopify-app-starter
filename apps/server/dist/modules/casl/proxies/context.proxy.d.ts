import { ExecutionContext } from '@nestjs/common';
import { AuthorizableRequest } from '@modules/casl';
export declare class ContextProxy {
    private readonly context;
    constructor(context: ExecutionContext);
    static create(context: ExecutionContext): ContextProxy;
    getRequest(): Promise<AuthorizableRequest>;
}
