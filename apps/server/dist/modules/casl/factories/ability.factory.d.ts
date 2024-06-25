import { Ability, AnyAbility, Subject } from '@casl/ability';
import { AuthorizableUser, DefaultActions, OptionsForFeature } from '@modules/casl';
export declare const nullConditionsMatcher: () => () => boolean;
export declare class AbilityFactory<Roles extends string = string, Subjects extends Subject = Subject, Actions extends string = DefaultActions, User extends AuthorizableUser<Roles, unknown> = AuthorizableUser<Roles, unknown>> {
    private readonly featureOptions;
    constructor(featureOptions: OptionsForFeature<Roles, Subjects, Actions, User>);
    createForUser(user: User, abilityClass?: typeof Ability): AnyAbility;
}
