import { PrismaService } from '@modules/common/providers/prisma';
import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { paginator, PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { DEFAULT_PAGINATION_LIMIT } from '@modules/common/constants/pagination.constants';
import { PaginationQueryDto } from '@modules/common/dtos/pagination-query.dto';

const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: DEFAULT_PAGINATION_LIMIT });

@Injectable()
export class OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public upsertMany(data: Prisma.OrderUpsertArgs[]): Promise<Order[]> {
    return this.prismaService.$transaction(
      data.map((d) => this.prismaService.order.upsert(d)),
    );
  }

  public findManyByShopId(
    shopId: string,
    paginationQueryDto: PaginationQueryDto,
  ): Promise<PaginatorTypes.PaginatedResult<Order[]>> {
    return paginate(
      this.prismaService.order,
      {
        where: { shopId }
      },
      {
        ...paginationQueryDto,
      }
    );
  }
}
