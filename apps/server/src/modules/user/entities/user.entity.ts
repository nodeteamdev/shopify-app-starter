import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum, User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserEntity implements User {
  @ApiProperty({
    type: String,
    example: '6d3d19c1-04f2-481a-90a8-157e88f6ea11',
  })
  @Expose()
  readonly id: string;

  @ApiProperty({
    type: String,
    example: 'someemail@gmail.com',
  })
  @Expose()
  readonly email: string | null;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  @Expose()
  readonly isEmailVerified: boolean;

  @Exclude()
  readonly role: RolesEnum;

  @Exclude()
  readonly password: string | null;

  @ApiProperty({ type: String, example: '2023-08-22T07:33:38.253Z' })
  @Expose()
  readonly createdAt: Date;

  @ApiProperty({ type: String, example: '2023-08-22T07:33:38.253Z' })
  @Expose()
  readonly updatedAt: Date;

  @ApiProperty({ type: String, example: 'https://someurl.com' })
  @Expose()
  readonly avatarUrl: string | null;

  @ApiProperty({ type: String, example: 'Alexander' })
  @Expose()
  readonly firstName: string;

  @ApiProperty({ type: String, example: 'Reynolds' })
  @Expose()
  readonly lastName: string;
}
