import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from '@modules/product/product.service';
import { ProductsQueryDto } from '@modules/product/dtos/products.query.dto';
import { ProductsDto } from '@modules/product/dtos/products.dto';
import { ApiOkBaseResponse } from '@modules/common/decorators/api-ok-base-response.decorator';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ProductVariantsDto } from '@modules/product/dtos/product-variants.dto';
import { ProductDto } from '@modules/product/dtos/product.dto';
import { ApiNotFoundBaseResponse } from '@modules/common/decorators/api-base-responses.decorator';

@ApiTags('Products')
@ApiExtraModels(ProductsDto, ProductVariantsDto, ProductDto)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOkBaseResponse({ dto: ProductDto })
  @Get(':shopName/products/:productId')
  public getOne(
    @Param('shopName') shopName: string,
    @Param('productId') productId: string,
  ): Promise<ProductDto> {
    return this.productService.getOne(shopName, productId);
  }

  @ApiOkBaseResponse({ dto: ProductsDto })
  @Get(':shopName/products')
  public getMany(
    @Param('shopName') shopName: string,
    @Query() productsQueryDto: ProductsQueryDto,
  ): Promise<ProductsDto> {
    return this.productService.getMany(shopName, productsQueryDto);
  }

  @ApiOkBaseResponse({ dto: ProductVariantsDto })
  @ApiNotFoundBaseResponse()
  @Get(':shopName/products/:productId/variants')
  public getProductVariants(
    @Param('shopName') shopName: string,
    @Param('productId') productId: string,
    @Query() productsQueryDto: ProductsQueryDto,
  ): Promise<ProductVariantsDto> {
    return this.productService.getProductVariants(
      shopName,
      productId,
      productsQueryDto,
    );
  }
}
