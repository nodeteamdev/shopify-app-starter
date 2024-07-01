import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from '@modules/product/product.service';
import { ProductsQueryDto } from '@modules/product/dtos/products.query.dto';
import { ProductsDto } from '@modules/product/dtos/products.dto';
import { ApiOkBaseResponse } from '@modules/common/decorators/api-ok-base-response.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOkBaseResponse({ dto: ProductsDto })
  @Get(':webShopId/products')
  public getMany(
    @Query() query: ProductsQueryDto,
  ): Promise<ProductsDto> {
    // TODO change param for session
    return this.productService.getMany(expect.anything(), query);
  }
}
