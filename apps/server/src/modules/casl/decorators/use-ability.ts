import { CustomDecorator, SetMetadata } from '@nestjs/common';
import {
  SubjectBeforeFilterHook,
  SubjectBeforeFilterTuple,
  AuthorizableRequest,
} from '@modules/casl';
import { Casl } from '@modules/casl/casl';
import { CASL_META_ABILITY } from '@modules/casl/casl.constants';

export function UseAbility<
  Subject = Casl.AnyObject,
  Request = AuthorizableRequest,
>(
  action: string,
  subject: Casl.AnyClass<Subject>,
  subjectHook?:
    | Casl.AnyClass<SubjectBeforeFilterHook<Subject, Request>>
    | SubjectBeforeFilterTuple<Subject, Request>,
): CustomDecorator {
  return SetMetadata(CASL_META_ABILITY, { action, subject, subjectHook });
}
