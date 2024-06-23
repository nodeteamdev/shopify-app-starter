import { JwtTokensDto } from '@modules/auth/dto/jwt-tokens.dto';

export class TokensEntity implements JwtTokensDto {
  readonly accessToken: string;

  readonly refreshToken: string;
}
