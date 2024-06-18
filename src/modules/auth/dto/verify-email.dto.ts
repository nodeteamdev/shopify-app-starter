import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({ type: String })
  @IsString()
  @MaxLength(10_000)
  @MinLength(100)
  readonly token: string;
}
