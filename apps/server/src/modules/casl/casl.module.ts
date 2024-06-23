import { Subject } from '@casl/ability';
import { DynamicModule, Module } from '@nestjs/common';
import { DefaultActions } from '@modules/casl/actions.enum';
import {
  OptionsForFeature,
  OptionsForRoot,
  OptionsForRootAsync,
} from '@modules/casl/interfaces/options.interface';
import {
  CASL_ROOT_OPTIONS,
  CASL_FEATURE_OPTIONS,
} from '@modules/casl/casl.constants';
import { AccessService } from '@modules/casl/access.service';
import { AbilityFactory } from '@modules/casl/factories/ability.factory';
import { AuthorizableUser } from '@modules/casl/interfaces/authorizable-user.interface';
import { CaslConfig } from '@modules/casl/casl.config';
import { AuthorizableRequest } from '@modules/casl/interfaces/request.interface';

@Module({
  imports: [],
  providers: [
    AccessService,
    AbilityFactory,
    {
      provide: CASL_FEATURE_OPTIONS,
      useValue: {},
    },
  ],
  exports: [AccessService],
})
export class CaslModule {
  static forFeature<
    Roles extends string = string,
    Subjects extends Subject = Subject,
    Actions extends string = DefaultActions,
    User extends AuthorizableUser<unknown, unknown> = AuthorizableUser<Roles>,
  >(options: OptionsForFeature<Roles, Subjects, Actions, User>): DynamicModule {
    return {
      module: CaslModule,
      imports: [],
      providers: [
        AccessService,
        AbilityFactory,
        {
          provide: CASL_FEATURE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  static forRoot<
    Roles extends string = string,
    User extends AuthorizableUser<unknown, unknown> = AuthorizableUser<Roles>,
    Request = AuthorizableRequest<User>,
  >(options: OptionsForRoot<Roles, User, Request>): DynamicModule {
    Reflect.defineMetadata(CASL_ROOT_OPTIONS, options, CaslConfig);
    return {
      module: CaslModule,
    };
  }

  static forRootAsync<
    Roles extends string = string,
    User extends AuthorizableUser<unknown, unknown> = AuthorizableUser<Roles>,
    Request = AuthorizableRequest<User>,
  >(options: OptionsForRootAsync<Roles, User, Request>): DynamicModule {
    return {
      module: CaslModule,
      imports: options.imports,
      providers: [
        {
          provide: CASL_ROOT_OPTIONS,
          useFactory: async (...args) => {
            const caslRootOptions = await options.useFactory(...args);
            Reflect.defineMetadata(
              CASL_ROOT_OPTIONS,
              caslRootOptions,
              CaslConfig,
            );

            return caslRootOptions;
          },
          inject: options.inject,
        },
      ],
    };
  }
}
