import { ModuleRef } from '@nestjs/core';
import { SubjectBeforeFilterHook, SubjectBeforeFilterTuple, AuthorizableRequest } from '@modules/casl';
import { Casl } from '@modules/casl/casl';
export declare class NullSubjectHook implements SubjectBeforeFilterHook {
    run(): Promise<undefined>;
}
export declare class TupleSubjectHook<Service> implements SubjectBeforeFilterHook {
    private service;
    private runFunc;
    constructor(service: Service, runFunc: (service: Service, request: AuthorizableRequest) => Promise<Casl.AnyObject | undefined>);
    run(request: AuthorizableRequest): Promise<Casl.AnyObject | undefined>;
}
export declare function subjectHookFactory(moduleRef: ModuleRef, hookOrTuple?: Casl.AnyClass<SubjectBeforeFilterHook> | SubjectBeforeFilterTuple): Promise<SubjectBeforeFilterHook>;
