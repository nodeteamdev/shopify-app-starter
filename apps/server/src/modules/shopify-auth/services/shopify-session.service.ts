import Cryptr from 'cryptr';
import { Session } from '@shopify/shopify-api';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ShopifyAuthSessionRepository } from '@modules/shopify-auth/repositories/shopify-session.repository';
import { ConfigService } from '@nestjs/config';
import { SESSIONS_NOT_FOUND, SESSION_NOT_FOUND } from '@modules/common/constants/errors.constants';

@Injectable()
export class ShopifyAuthSessionService {
  private cryptr: Cryptr;

  constructor(
    private readonly shopifyAuthSessionRepository: ShopifyAuthSessionRepository,
    private readonly configService: ConfigService,
  ) {
    this.cryptr = new Cryptr(
      this.configService.get<string>('shopify.encryptionString'),
    );
  }

  public async storeSession(session: Session): Promise<boolean> {
    const encryptedContent = this.encrypt(
      JSON.stringify(session),
    );

    await this.shopifyAuthSessionRepository.upsert(session, encryptedContent);

    return true;
  }

  public async loadSession(id: string): Promise<Session | null> {
    const session = await this.shopifyAuthSessionRepository.findUnique(id);

    if (!session) {
      throw new NotFoundException(SESSION_NOT_FOUND);
    }

    if (session.content.length > 0) {
      const decryptedContent = this.decrypt(
        session.content,
      );

      const sessionObj = JSON.parse(decryptedContent);

      return new Session(sessionObj);
    }

    return null;
  }

  public async loadSessionByShop(id: string): Promise<Session | null> {
    const sessions = await this.shopifyAuthSessionRepository.findMany(id);

    if (!sessions.length) {
      throw new NotFoundException(SESSIONS_NOT_FOUND)
    }

    const filteredSessions = sessions.filter(
      (session) => !session.id.includes('offline'),
    );

    if (filteredSessions.length > 0) {
      const decryptedContent = this.decrypt(
        filteredSessions[0].content,
      );
      const sessionObj = JSON.parse(decryptedContent);

      return new Session(sessionObj);
    }

    return null;
  }

  public async deleteSession(id: string): Promise<boolean> {
    await this.shopifyAuthSessionRepository.deleteMany(id);

    return true;
  }

  private encrypt(data: string): string {
    return this.cryptr.encrypt(data);
  }

  private decrypt(encryptedData: string): string {
    return this.cryptr.decrypt(encryptedData);
  }
}