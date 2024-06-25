import { JwtTokensDto } from '@modules/auth/dto/jwt-tokens.dto';
export declare class TokensEntity implements JwtTokensDto {
    readonly accessToken: string;
    readonly refreshToken: string;
}
