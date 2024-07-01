import { Session, SessionParams } from '@shopify/shopify-api';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SESSIONS_NOT_FOUND, SESSION_NOT_FOUND } from '@modules/common/constants/errors.constants';
import { ShopifyAuthSessionRepository } from '@modules/shopify-auth/repositories/shopify-auth-session.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class ShopifyAuthSessionService {
  constructor(private readonly shopifyAuthSessionRepository: ShopifyAuthSessionRepository) {}

  public async save(session: Session): Promise<boolean> {
    // TODO if we decide to encrypt session token
    // const encryptedContent = this.encrypt(
    //   JSON.stringify(session),
    // );

    await this.shopifyAuthSessionRepository.upsert(session);

    return true;
  }

  public async getSession(id: string): Promise<Session> {
    const session = await this.shopifyAuthSessionRepository.findUnique(id);

    if (!session) {
      throw new NotFoundException(SESSION_NOT_FOUND);
    }

    if (!session.content) {
      const sessionObj = session.content as SessionParams;

      return new Session(sessionObj);
    }

    return;
  }

  public async getSessionByShopName(shopName: string): Promise<Session> {
    const sessions = await this.shopifyAuthSessionRepository.findManyByShopName(shopName);

    if (!sessions.length) {
      throw new NotFoundException(SESSIONS_NOT_FOUND)
    }

    const filteredSessions = sessions.filter(
      (session) => !session.id.includes('offline'),
    );

    if (filteredSessions.length > 0) {
      const sessionData = filteredSessions[0].content as SessionParams;

      return new Session(sessionData);
    }

    return;
  }

  public async deleteSessionsByShopName(shopName: string): Promise<void> {
    await this.shopifyAuthSessionRepository.deleteManyByShopName(shopName);
  }

  // TODO Later if we decide to encrypt session tokens
  // private encrypt(data: string): string {
  //   return this.cryptr.encrypt(data);
  // }

  // TODO Later if we decide to encrypt session tokens
  // private decrypt(encryptedData: string): string {
  //   return this.cryptr.decrypt(encryptedData);
  // }
}