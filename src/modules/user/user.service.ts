import { randomUUID } from 'node:crypto';
import { UserEntity } from '@modules/user/entities/user.entity';
import { CreateUser } from '@modules/user/types/create-user.type';
import { UpdateUser } from '@modules/user/types/update-user.type';
import { UserRepository } from '@modules/user/user.repository';
import { Injectable } from '@nestjs/common';
import { RolesEnum } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async find(id: string): Promise<UserEntity | null> {
    return this.userRepository.find(id);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }

  public create(data: CreateUser): Promise<UserEntity> {
    return this.userRepository.create({
      id: randomUUID(),
      ...data,
      role: RolesEnum.CUSTOMER,
    });
  }

  public update(id: string, data: UpdateUser): Promise<UserEntity> {
    return this.userRepository.update(id, data);
  }
}
