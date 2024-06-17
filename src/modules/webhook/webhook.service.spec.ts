import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { WebhookService } from '@modules/webhook/webhook.service';
import { WebhookRepository } from '@modules/webhook/webhook.repository';
import { Webhook } from '@prisma/client';
import WebhookStub from './dtos/stubs/webhook.stub';

describe('WebhookService', () => {
  let webhookService: WebhookService;
  let webhookRepository: DeepMocked<WebhookRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookService,
        {
          provide: WebhookRepository,
          useValue: createMock<WebhookRepository>({
            create: jest.fn().mockResolvedValue(WebhookStub()),
            getOneByWebhookId: jest.fn().mockResolvedValue(WebhookStub()),
          }),
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    webhookService = module.get<WebhookService>(WebhookService);
    webhookRepository =
      module.get<DeepMocked<WebhookRepository>>(WebhookRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(webhookService).toBeDefined();
  });

  describe('WebhookService.create()', () => {
    let expectedResult: Webhook;

    beforeEach(async () => {
      expectedResult = await webhookService.create(WebhookStub());
    });

    it('should create a webhook', () => {
      expect(expectedResult).toStrictEqual(WebhookStub());
    });

    it('should call webhookRepository.create()', () => {
      expect(webhookRepository.create).toHaveBeenCalled();
    });

    it('should call webhookRepository.create() with correct arguments', () => {
      expect(webhookRepository.create).toHaveBeenCalledWith(WebhookStub());
    });
  });

  describe('WebhookService.getOneByWebhookId()', () => {
    let expectedResult: Webhook | null;

    beforeEach(async () => {
      expectedResult = await webhookService.getOneByWebhookId(
        WebhookStub().webhookId,
      );
    });

    it('should get webhook', () => {
      expect(expectedResult).toStrictEqual(WebhookStub());
    });

    it('should call webhookRepository.getOneByWebhookId()', () => {
      expect(webhookRepository.getOneByWebhookId).toHaveBeenCalled();
    });

    it('should call webhookRepository.getOneByWebhookId() with correct arguments', () => {
      expect(webhookRepository.getOneByWebhookId).toHaveBeenCalledWith(
        WebhookStub().webhookId,
      );
    });
  });

  describe('WebhookService.isDuplicate() with true response', () => {
    let expectedResult: boolean;

    beforeEach(async () => {
      expectedResult = await webhookService.isDuplicate(
        WebhookStub().webhookId,
      );
    });

    it('should check for webhook duplication', () => {
      expect(expectedResult).toStrictEqual(true);
    });

    it('should call webhookRepository.getOneByWebhookId()', () => {
      expect(webhookRepository.getOneByWebhookId).toHaveBeenCalled();
    });

    it('should call webhookRepository.getOneByWebhookId() with correct arguments', () => {
      expect(webhookRepository.getOneByWebhookId).toHaveBeenCalledWith(
        WebhookStub().webhookId,
      );
    });
  });
});
