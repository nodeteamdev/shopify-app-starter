import * as readline from 'readline';
import { Readable } from 'node:stream';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Order } from '@prisma/client';
import { ShopifyBulkOperationRepository } from '@modules/bulk-operation/shopify-bulk-operation.repository';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { ShopifyBulkOperation } from '@modules/bulk-operation/interfaces/shopify-bulk-operation.interface';
import { CreatedBulkOperation } from '@modules/bulk-operation/interfaces/created-bulk-operation.interface';
import { OrderService } from '@modules/order/order.service';
import { ShopService } from '@modules/shop/shop.service';
import { OrderDto } from '@modules/order/dtos/order.dto';
import { BulkOperationStatusesEnum } from './enums/bulk-operation-statuses.enum';
import { BULK_OPERATION_NOT_COMPLETED } from '@modules/common/constants/errors.constants';

@Injectable()
export class BulkOperationService {
  private readonly logger: Logger = new Logger(BulkOperationService.name);

  constructor(
    private readonly shopifyBulkOperationRepository: ShopifyBulkOperationRepository,
    private readonly shopifyAuthSessionService: ShopifyAuthSessionService,
    public readonly httpService: HttpService,
    public readonly orderService: OrderService,
    public readonly shopService: ShopService,
  ) {}

  private static parseLine(parsedLine: any, orders: OrderDto[]): void {
    if (!parsedLine.__parentId) {
      parsedLine.id = parsedLine.id.split('/').at(-1);

      orders.push(parsedLine);
    } else if (parsedLine.quantity) {
      parsedLine.__parentId = parsedLine.__parentId.split('/').at(-1);

      const lineItemVariant = { ...parsedLine.variant };

      delete parsedLine.variant;

      if (parsedLine.variant && parsedLine.variant.id) {
        lineItemVariant.id = parsedLine.variant.id.split('/').at(-1);
      }

      const parentId = parsedLine.__parentId;

      const parentOrder = orders.find((order) => order.id === parentId);

      if (!parentOrder.lineItems) {
        parentOrder.lineItems = [];
      }

      const lineItem = { ...parsedLine };
      delete lineItem.__parentId;

      if (lineItem.product) {
        lineItem.productId = lineItem.product.id.split('/').at(-1);
      } else {
        lineItem.productId = null;
      }

      lineItem.lineItemVariant = lineItemVariant;

      delete lineItem.product;

      if (Object.keys(lineItem.lineItemVariant).length === 0) {
        lineItem.lineItemVariant = null;
      } else {
        lineItem.lineItemVariant.id = lineItem.lineItemVariant.id
          .split('/')
          .at(-1);
      }

      parentOrder.lineItems.push(lineItem);
    }
  }

  public async create(shopName: string): Promise<CreatedBulkOperation> {
    const shopifySession =
      await this.shopifyAuthSessionService.getShopifySessionByShopName(
        shopName,
      );

    const {
      body: {
        data: {
          bulkOperationRunQuery: { bulkOperation: createdBulkOperation },
        },
      },
    } = await this.shopifyBulkOperationRepository.create(shopifySession);

    return createdBulkOperation;
  }

  public async findOne(
    shopName: string,
    bulkOperationId: string,
  ): Promise<ShopifyBulkOperation> {
    const shopifySession =
      await this.shopifyAuthSessionService.getShopifySessionByShopName(
        shopName,
      );

    const {
      body: {
        data: { node: bulkOperation },
      },
    } = await this.shopifyBulkOperationRepository.findOne(
      shopifySession,
      bulkOperationId,
    );

    return bulkOperation;
  }

  public async createAndGetBulkOperation(
    shopName: string,
  ): Promise<ShopifyBulkOperation> {
    const createdBulkOperation = await this.create(shopName);

    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const foundBulkOperation = await this.findOne(
            shopName,
            createdBulkOperation.id,
          );

          resolve(foundBulkOperation);
        } catch (error) {
          this.logger.error('Error fetching bulk operation:', error);
          reject(error);
        }
      }, 2000);
    });
  }

  public async parseAndSaveOrders(shopName: string): Promise<Order[]> {
    const bulkOperation = await this.createAndGetBulkOperation(shopName);

    if (bulkOperation.status !== BulkOperationStatusesEnum.COMPLETED) {
      throw new BadRequestException(BULK_OPERATION_NOT_COMPLETED);
    }

    const { id: shopId } =
      await this.shopService.findOneByPrimaryDomain(shopName);

    const stream = await this.getReadableStream(bulkOperation.url);

    return new Promise((resolve, reject) => {
      try {
        const rl = readline.createInterface({
          input: stream,
        });

        const orders = [];

        rl.on('line', async (line) => {
          const parsedLine = JSON.parse(line);

          BulkOperationService.parseLine(parsedLine, orders);
        });

        rl.on('close', async () => {
          await this.orderService.upsertMany(shopId, orders);

          resolve(orders);
        });

        rl.on('error', (error) => {
          this.logger.error('Error reading the file:', error);

          reject(error);
        });
      } catch (error) {
        this.logger.error(error);

        reject(error);
      }
    });
  }

  private async getReadableStream(url: string): Promise<Readable> {
    try {
      const response = await this.httpService.axiosRef.get(url, {
        responseType: 'stream',
      });

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
