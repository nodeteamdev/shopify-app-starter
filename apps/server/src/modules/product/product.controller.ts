import { ApiNotFoundBaseResponse } from '@modules/common/decorators/api-base-responses.decorator';
import { ApiOkBaseResponse } from '@modules/common/decorators/api-ok-base-response.decorator';
import { ProductVariantsDto } from '@modules/product/dtos/product-variants.dto';
import { ProductDto } from '@modules/product/dtos/product.dto';
import { ProductsDto } from '@modules/product/dtos/products.dto';
import { ProductsQueryDto } from '@modules/product/dtos/products.query.dto';
import { ProductService } from '@modules/product/product.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { GetRecommendationsDto } from '@modules/product/dtos/get-recommendation.dto';
import { GetProductNode } from '@modules/product/interfaces/get-products.interface';

@ApiTags('Products')
@ApiExtraModels(ProductsDto, ProductVariantsDto, ProductDto)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOkBaseResponse({ dto: ProductsDto })
  @Get(':shopName/products/recommendations')
  public getProductRecommendations(
    @Param('shopName') shopName: string,
    @Query() query: GetRecommendationsDto,
  ): Promise<{ products: GetProductNode[]; count: number }> {
    return this.productService.getProductRecommendations(shopName, query);
  }

  @ApiNotFoundBaseResponse()
  @Get(':shopName/products/count')
  public async countProducts(
    @Param('shopName') shopName: string,
  ): Promise<{ count: number }> {
    return this.productService.productsCount(shopName);
  }

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
