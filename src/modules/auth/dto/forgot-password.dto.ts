import { PickType } from '@nestjs/swagger';
import { SignUpDto } from '@modules/auth/dto/sign-up.dto';

export class ForgotPasswordDto extends PickType(SignUpDto, ['email']) {}
