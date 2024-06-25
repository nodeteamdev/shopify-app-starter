import {
  IsString,
  Length,
  Matches,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '@modules/user/entities/user.entity';
import { NodeEnvsEnum } from '@modules/common/enums/node-envs.enum';

const isProduction: boolean = process.env.NODE_ENV === NodeEnvsEnum.PRODUCTION;

export class SignUpDto
  implements Pick<UserEntity, 'email' | 'password' | 'firstName' | 'lastName'>
{
  @ApiProperty({
    type: String,
    example: process.env.TEST_EMAIL || 'someemail@gmail.com',
  })
  @Matches(isProduction ? /^(?!.*\+).*$/ : /./, {
    message: `Email mustn't contain additional domains`,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  @Matches(/[\d\W]/, {
    message:
      'password must contain at least one digit and/or special character',
  })
  @Matches(/[a-zA-Z]/, { message: 'password must contain at least one letter' })
  @Matches(/^\S+$/, { message: 'password must not contain spaces' })
  @ApiProperty({ type: String, example: 'string!12345' })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({ type: String, example: 'Alexander' })
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({ type: String, example: 'Reynolds' })
  readonly lastName: string;
}
