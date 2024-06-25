import { InferSubjects } from '@casl/ability';
import { TokensEntity } from '@modules/auth/entities/tokens.entity';
import { Actions, Permissions } from '@modules/casl';
import { RolesEnum } from '@prisma/client';

export type Subjects = InferSubjects<typeof TokensEntity>;

export const authPermissions: Permissions<RolesEnum, Subjects, Actions> = {
  everyone({ can }) {
    can(Actions.delete, TokensEntity);
  },
};
