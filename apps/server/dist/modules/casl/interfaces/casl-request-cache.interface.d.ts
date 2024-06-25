import { ConditionsProxy } from '@casl/proxies/conditions.proxy';
import { AuthorizableUser, SubjectBeforeFilterHook, UserBeforeFilterHook } from '@modules/casl';
import { Casl } from '@modules/casl/casl';
export interface CaslRequestCache<User extends AuthorizableUser<unknown, unknown> = AuthorizableUser, Subject = Casl.AnyObject> {
    user?: User;
    subject?: Subject;
    conditions?: ConditionsProxy;
    hooks: {
        user: UserBeforeFilterHook<User>;
        subject: SubjectBeforeFilterHook<Subject>;
    };
}
