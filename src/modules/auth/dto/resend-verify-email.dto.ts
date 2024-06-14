import { PickType } from '@nestjs/swagger';
import { SignUpDto } from '@modules/auth/dto/sign-up.dto';

export class ResendVerifyEmailDto extends PickType(SignUpDto, ['email']) {}
