import { AuthorizableUser } from '@modules/casl';
import { Casl } from '@modules/casl/casl';
import { CaslRequestCache } from '@modules/casl/interfaces/casl-request-cache.interface';

export interface AuthorizableRequest<
  User extends AuthorizableUser<unknown, unknown> = AuthorizableUser,
  Subject = Casl.AnyObject,
> {
  user?: User;
  currentUser?: User;
  casl: CaslRequestCache<User, Subject>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ContextWithAuthorizableRequest<
  User extends AuthorizableUser<unknown, unknown> = AuthorizableUser,
  Subject = Casl.AnyObject,
> {
  req: AuthorizableRequest<User, Subject>;
}
