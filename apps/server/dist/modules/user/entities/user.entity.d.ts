import { RolesEnum, User } from '@prisma/client';
export declare class UserEntity implements User {
    readonly id: string;
    readonly email: string | null;
    readonly isEmailVerified: boolean;
    readonly role: RolesEnum;
    readonly password: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly avatarUrl: string | null;
    readonly firstName: string;
    readonly lastName: string;
}
