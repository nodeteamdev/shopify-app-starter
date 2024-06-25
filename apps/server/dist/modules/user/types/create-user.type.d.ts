import { UserEntity } from '@modules/user/entities/user.entity';
export type CreateUser = Pick<UserEntity, 'email' | 'password' | 'firstName' | 'lastName'>;
