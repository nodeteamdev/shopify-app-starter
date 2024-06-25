import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { AccessService } from '@modules/casl/access.service';
export declare class AccessGuard implements CanActivate {
    private readonly reflector;
    private readonly accessService;
    private readonly moduleRef;
    constructor(reflector: Reflector, accessService: AccessService, moduleRef: ModuleRef);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
