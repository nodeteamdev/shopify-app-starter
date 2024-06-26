export { CaslModule } from '@modules/casl/casl.module';

export { AuthorizableUser } from '@modules/casl/interfaces/authorizable-user.interface';

export { AuthorizableUserMeta } from '@modules/casl/interfaces/authorizable-user-meta.interface';

export { AuthorizableRequest } from '@modules/casl/interfaces/request.interface';

export {
  CaslConditions,
  CaslSubject,
  CaslUser,
  UseAbility,
} from '@modules/casl/decorators';

export {
  SubjectBeforeFilterHook,
  SubjectBeforeFilterTuple,
  UserBeforeFilterHook,
  UserBeforeFilterTuple,
} from '@modules/casl/interfaces/hooks.interface';

export {
  AnyPermissions,
  DefinePermissions,
  Permissions,
} from '@modules/casl/interfaces/permissions.interface';

export {
  OptionsForRoot,
  OptionsForFeature,
} from '@modules/casl/interfaces/options.interface';

export { Actions, DefaultActions } from '@modules/casl/actions.enum';

export { AccessGuard } from '@modules/casl/access.guard';

export { AccessService } from '@modules/casl/access.service';

export { InferSubjects } from '@casl/ability';
