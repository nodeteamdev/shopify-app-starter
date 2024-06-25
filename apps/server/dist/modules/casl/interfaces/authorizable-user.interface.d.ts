import { RolesEnum } from '@prisma/client';
export interface AuthorizableUser<_Roles = string, Id = string> {
    readonly id: Id;
    readonly role: RolesEnum;
}
