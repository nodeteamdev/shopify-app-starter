import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { SignUpDto } from '@modules/auth/dto/sign-up.dto';

export class ResetPasswordDto extends PickType(SignUpDto, ['password']) {
  @ApiProperty({ type: String })
  @IsString()
  @MaxLength(10_000)
  @MinLength(100)
  readonly token: string;
}
