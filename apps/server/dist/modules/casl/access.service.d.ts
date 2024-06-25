import { AnyAbility } from '@casl/ability';
import { Casl } from '@modules/casl/casl';
import { AbilityFactory } from '@modules/casl/factories/ability.factory';
import { AbilityMetadata } from '@modules/casl/interfaces/ability-metadata.interface';
import { AuthorizableUser } from '@modules/casl/interfaces/authorizable-user.interface';
import { AuthorizableRequest } from '@modules/casl/interfaces/request.interface';
export declare class AccessService {
    private abilityFactory;
    constructor(abilityFactory: AbilityFactory);
    getAbility<User extends AuthorizableUser<string, unknown> = AuthorizableUser>(user: User): AnyAbility;
    hasAbility<User extends AuthorizableUser<string, unknown> = AuthorizableUser>(user: User, action: string, caslSubject: Casl.Subject): boolean;
    assertAbility<User extends AuthorizableUser<string, unknown> = AuthorizableUser>(user: User, action: string, caslSubject: Casl.Subject): void;
    canActivateAbility<Subject = Casl.AnyObject>(request: AuthorizableRequest, ability?: AbilityMetadata<Subject>): Promise<boolean>;
}
