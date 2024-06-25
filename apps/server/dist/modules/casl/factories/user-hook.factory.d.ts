import { ModuleRef } from '@nestjs/core';
import { UserBeforeFilterHook, UserBeforeFilterTuple, AuthorizableUser } from '@modules/casl';
import { Casl } from '@modules/casl/casl';
export declare class NullUserHook implements UserBeforeFilterHook {
    run(): Promise<undefined>;
}
export declare class TupleUserHook<Service> implements UserBeforeFilterHook {
    private service;
    private runFunc;
    constructor(service: Service, runFunc: (service: Service, user: AuthorizableUser) => Promise<AuthorizableUser | undefined>);
    run(user: AuthorizableUser): Promise<AuthorizableUser | undefined>;
}
export declare function userHookFactory(moduleRef: ModuleRef, hookOrTuple?: Casl.AnyClass<UserBeforeFilterHook> | UserBeforeFilterTuple): Promise<UserBeforeFilterHook>;
