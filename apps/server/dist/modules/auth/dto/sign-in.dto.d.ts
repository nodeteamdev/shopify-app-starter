import { SignUpDto } from '@modules/auth/dto/sign-up.dto';
declare const SignInDto_base: import("@nestjs/common").Type<Pick<SignUpDto, "password" | "email">>;
export declare class SignInDto extends SignInDto_base {
}
export {};
