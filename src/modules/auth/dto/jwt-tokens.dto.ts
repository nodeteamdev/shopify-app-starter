import { ApiProperty } from '@nestjs/swagger';

export class JwtTokensDto {
  @ApiProperty({ type: String })
  readonly accessToken: string;

  @ApiProperty({ type: String })
  readonly refreshToken: string;
}
