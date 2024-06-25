import { AuthorizableUser, AuthorizableRequest } from '@modules/casl';
import { Casl } from '@modules/casl/casl';
export declare class SubjectProxy<Subject = Casl.AnyObject> {
    private request;
    constructor(request: AuthorizableRequest<AuthorizableUser, Subject>);
    get(): Promise<Subject | undefined>;
    private getRequest;
}
