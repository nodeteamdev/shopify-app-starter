import { Session as ShopifySession, SessionParams } from '@shopify/shopify-api';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Session } from '@prisma/client';
import {
  SESSIONS_NOT_FOUND,
  SESSION_NOT_FOUND,
} from '@modules/common/constants/errors.constants';
import { ShopifyAuthSessionRepository } from '@modules/shopify-auth/shopify-auth-session.repository';

@Injectable()
export class ShopifyAuthSessionService {
  constructor(
    private readonly shopifyAuthSessionRepository: ShopifyAuthSessionRepository,
  ) {}

  public async save(session: ShopifySession, shopId: string): Promise<boolean> {
    // TODO if we decide to encrypt session token
    // const encryptedContent = this.encrypt(
    //   JSON.stringify(session),
    // );

    await this.shopifyAuthSessionRepository.upsert(session, shopId);

    return true;
  }

  public async getShopifySession(id: string): Promise<ShopifySession> {
    const session = await this.shopifyAuthSessionRepository.findUnique(id);

    if (!session) {
      return undefined;
    }

    if (session.content) {
      const sessionData: SessionParams = JSON.parse(
        session.content as string,
      ) as SessionParams;

      return new ShopifySession(sessionData);
    }

    return;
  }

  public async getShopifySessionByShopName(
    shopName: string,
  ): Promise<ShopifySession> {
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

      return new ShopifySession(sessionData);
    }

    return;
  }

  public async getShopifySessionByShopId(
    shopId: string,
  ): Promise<ShopifySession> {
    const sessions =
      await this.shopifyAuthSessionRepository.findManyByShopId(shopId);

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

      return new ShopifySession(sessionData);
    }

    return;
  }

  public async deleteSessionsByShopName(shopName: string): Promise<void> {
    await this.shopifyAuthSessionRepository.deleteManyByShopName(shopName);
  }

  public async getSession(id: string): Promise<Session> {
    const session = await this.shopifyAuthSessionRepository.findUnique(id);

    if (!session) {
      throw new NotFoundException(SESSION_NOT_FOUND);
    }

    return session;
  }

  public deleteManyByShopId(shopId: string): Promise<Prisma.BatchPayload> {
    return this.shopifyAuthSessionRepository.deleteManyByShopId(shopId);
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
