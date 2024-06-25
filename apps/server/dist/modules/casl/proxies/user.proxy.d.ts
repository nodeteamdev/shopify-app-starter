import { AuthorizableRequest, AuthorizableUser, AuthorizableUserMeta } from '@modules/casl';
export declare class UserProxy<User extends AuthorizableUser<unknown, unknown> = AuthorizableUser, UserMeta extends AuthorizableUserMeta<unknown> = AuthorizableUserMeta> {
    private request;
    private getUserFromRequest;
    constructor(request: AuthorizableRequest<User>, getUserFromRequest: (request: AuthorizableRequest<User>) => User | undefined);
    get(): Promise<User | undefined>;
    getMeta(): Promise<UserMeta>;
    getFromRequest(): User | undefined;
    getFromHook(): Promise<User | undefined>;
    private getRequest;
}
