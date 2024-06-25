import { CustomDecorator } from '@nestjs/common';
import { SubjectBeforeFilterHook, SubjectBeforeFilterTuple, AuthorizableRequest } from '@modules/casl';
import { Casl } from '@modules/casl/casl';
export declare function UseAbility<Subject = Casl.AnyObject, Request = AuthorizableRequest>(action: string, subject: Casl.AnyClass<Subject>, subjectHook?: Casl.AnyClass<SubjectBeforeFilterHook<Subject, Request>> | SubjectBeforeFilterTuple<Subject, Request>): CustomDecorator;
