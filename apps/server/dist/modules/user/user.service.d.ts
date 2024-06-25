import { UserEntity } from '@modules/user/entities/user.entity';
import { CreateUser } from '@modules/user/types/create-user.type';
import { UpdateUser } from '@modules/user/types/update-user.type';
import { UserRepository } from '@modules/user/user.repository';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    find(id: string): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    create(data: CreateUser): Promise<UserEntity>;
    update(id: string, data: UpdateUser): Promise<UserEntity>;
}
