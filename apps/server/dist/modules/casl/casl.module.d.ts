import { Subject } from '@casl/ability';
import { DynamicModule } from '@nestjs/common';
import { DefaultActions } from '@modules/casl/actions.enum';
import { OptionsForFeature, OptionsForRoot, OptionsForRootAsync } from '@modules/casl/interfaces/options.interface';
import { AuthorizableUser } from '@modules/casl/interfaces/authorizable-user.interface';
import { AuthorizableRequest } from '@modules/casl/interfaces/request.interface';
export declare class CaslModule {
    static forFeature<Roles extends string = string, Subjects extends Subject = Subject, Actions extends string = DefaultActions, User extends AuthorizableUser<unknown, unknown> = AuthorizableUser<Roles>>(options: OptionsForFeature<Roles, Subjects, Actions, User>): DynamicModule;
    static forRoot<Roles extends string = string, User extends AuthorizableUser<unknown, unknown> = AuthorizableUser<Roles>, Request = AuthorizableRequest<User>>(options: OptionsForRoot<Roles, User, Request>): DynamicModule;
    static forRootAsync<Roles extends string = string, User extends AuthorizableUser<unknown, unknown> = AuthorizableUser<Roles>, Request = AuthorizableRequest<User>>(options: OptionsForRootAsync<Roles, User, Request>): DynamicModule;
}
