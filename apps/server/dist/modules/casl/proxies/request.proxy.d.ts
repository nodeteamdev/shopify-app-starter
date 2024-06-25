import { ConditionsProxy } from '@casl/proxies/conditions.proxy';
import { AuthorizableRequest, AuthorizableUser, SubjectBeforeFilterHook, UserBeforeFilterHook } from '@modules/casl';
import { Casl } from '@modules/casl/casl';
import { CaslRequestCache } from '@modules/casl/interfaces/casl-request-cache.interface';
export declare class RequestProxy<User extends AuthorizableUser<unknown, unknown> = AuthorizableUser, Subject = Casl.AnyObject> {
    private request;
    private readonly defaultCaslCache;
    constructor(request: AuthorizableRequest<User, Subject>);
    get cached(): CaslRequestCache<User, Subject>;
    getConditions(): ConditionsProxy | undefined;
    setConditions(conditions: ConditionsProxy): void;
    getSubject(): Subject | undefined;
    setSubject(subject: Subject | undefined): void;
    getUser(): User | undefined;
    setUser(user: User | undefined): void;
    getUserHook(): UserBeforeFilterHook<User>;
    setUserHook(hook: UserBeforeFilterHook<User>): void;
    getSubjectHook(): SubjectBeforeFilterHook<Subject>;
    setSubjectHook(hook: SubjectBeforeFilterHook<Subject>): void;
}
