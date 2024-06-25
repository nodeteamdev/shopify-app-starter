import { SignUpDto } from '@modules/auth/dto/sign-up.dto';
declare const ResetPasswordDto_base: import("@nestjs/common").Type<Pick<SignUpDto, "password">>;
export declare class ResetPasswordDto extends ResetPasswordDto_base {
    readonly token: string;
}
export {};
