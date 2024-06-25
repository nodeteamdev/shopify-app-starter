import { Ability, AbilityBuilder, AbilityTuple, AnyAbility, Subject } from '@casl/ability';
import { AuthorizableUser, DefaultActions } from '@modules/casl';
import { Casl } from '@modules/casl/casl';
export declare class UserAbilityBuilder<Subjects extends Subject = Subject, Actions extends string = DefaultActions, User extends AuthorizableUser<unknown, unknown> = AuthorizableUser> extends AbilityBuilder<AnyAbility> {
    user: User;
    permissions: AnyPermissions<string, Subjects, Actions, User>;
    constructor(user: User, permissions: AnyPermissions<string, Subjects, Actions, User>, AbilityType: Casl.AnyClass<Ability<AbilityTuple<Actions, Subjects>>>);
    extend: (role: string) => void;
    permissionsFor(role: string): void;
}
export type DefinePermissions<Subjects extends Subject = Subject, Actions extends string = DefaultActions, User extends AuthorizableUser<unknown, unknown> = AuthorizableUser> = (builder: UserAbilityBuilder<Subjects, Actions, User>) => void;
export type Permissions<Roles extends string, Subjects extends Subject = Subject, Actions extends string = DefaultActions, User extends AuthorizableUser<unknown, unknown> = AuthorizableUser<Roles>> = Partial<Record<Roles | 'every' | 'everyone', DefinePermissions<Subjects, Actions, User>>>;
export type AnyPermissions<Roles extends string = string, Subjects extends Subject = Subject, Actions extends string = string, User extends AuthorizableUser<unknown, unknown> = AuthorizableUser<Roles>> = Permissions<Roles, Subjects, Actions, User>;
