import { Ability, AnyAbility, PureAbility, Subject } from '@casl/ability';
import {
  AuthorizableUser,
  DefaultActions,
  OptionsForFeature,
} from '@modules/casl';
import { CASL_FEATURE_OPTIONS } from '@modules/casl/casl.constants';
import { UserAbilityBuilder } from '@modules/casl/interfaces/permissions.interface';
import { Inject, Injectable } from '@nestjs/common';

export const nullConditionsMatcher = () => (): boolean => true;

@Injectable()
export class AbilityFactory<
  Roles extends string = string,
  Subjects extends Subject = Subject,
  Actions extends string = DefaultActions,
  User extends AuthorizableUser<Roles, unknown> = AuthorizableUser<
    Roles,
    unknown
  >,
> {
  constructor(
    @Inject(CASL_FEATURE_OPTIONS)
    private readonly featureOptions: OptionsForFeature<
      Roles,
      Subjects,
      Actions,
      User
    >,
  ) {}

  createForUser(user: User, abilityClass = Ability): AnyAbility {
    const { permissions } = this.featureOptions;

    const ability = new UserAbilityBuilder<Subjects, Actions, User>(
      user,
      permissions,
      abilityClass,
    );

    const everyone = permissions.everyone || permissions.every;

    if (everyone) {
      everyone(ability);
    }

    // For PureAbility skip conditions check, conditions will be available for filtering through @CaslConditions() param
    if (abilityClass === PureAbility) {
      return ability.build({ conditionsMatcher: nullConditionsMatcher });
    }

    return ability.build();
  }
}
