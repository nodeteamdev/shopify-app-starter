import { SESSION_NOT_FOUND } from '@modules/common/constants/errors.constants';
import { SESSIONS_NOT_FOUND } from '@modules/common/constants/errors.constants';
import { ShopifyAuthSessionRepository } from '@modules/shopify-auth/shopify-auth-session.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Session, SessionParams } from '@shopify/shopify-api';

@Injectable()
export class ShopifyAuthSessionService {
  constructor(
    private readonly shopifyAuthSessionRepository: ShopifyAuthSessionRepository,
  ) {}

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

    if (session.content) {
      const sessionData: SessionParams = JSON.parse(
        session.content as string,
      ) as SessionParams;

      return new Session(sessionData);
    }

    return;
  }

  public async getSessionByShopName(shopName: string): Promise<Session> {
    const sessions =
      await this.shopifyAuthSessionRepository.findManyByShopName(shopName);

    if (!sessions.length) {
      throw new NotFoundException(SESSIONS_NOT_FOUND);
    }

    const filteredSessions = sessions.filter(
      (session) => !session.id.includes('offline'),
    );

    if (filteredSessions.length > 0) {
      const sessionData: SessionParams = JSON.parse(
        filteredSessions[0].content as string,
      ) as SessionParams;

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
