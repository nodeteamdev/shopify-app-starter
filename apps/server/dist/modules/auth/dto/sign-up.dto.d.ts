import { UserEntity } from '@modules/user/entities/user.entity';
export declare class SignUpDto implements Pick<UserEntity, 'email' | 'password' | 'firstName' | 'lastName'> {
    readonly email: string;
    readonly password: string;
    readonly firstName: string;
    readonly lastName: string;
}
