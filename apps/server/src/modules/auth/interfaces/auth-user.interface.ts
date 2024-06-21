import { RolesEnum } from '@prisma/client';

export interface AuthUser {
  readonly id: string;
  readonly role: RolesEnum;
  readonly sessionId: string;
  readonly iat: number;
  readonly exp: number;
  readonly _meta?: {
    readonly accessToken: string;
  };
}
