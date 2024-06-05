import { randomBytes } from 'crypto';

export function getUserSlotsKey(userId: string) {
  return `user_slots:${userId}`;
}
export function generateCode(): string {
  return `000000${Array.from(randomBytes(3)).join('')}`.slice(-6);
}

export function getVerificationsCodeKey(email: string): `user_codes:${string}` {
  return `user_codes:${email}`;
}
