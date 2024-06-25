import { UserEntity } from '@modules/user/entities/user.entity';
export type UpdateUser = Partial<Pick<UserEntity, 'password' | 'isEmailVerified' | 'firstName' | 'lastName'>>;
