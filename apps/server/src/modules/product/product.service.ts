import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '@modules/product/product.repository';
import { ProductDto } from '@modules/product/dtos/product.dto';
import { Product } from '@modules/product/interfaces/product.interface';
import { ProductsQueryDto } from '@modules/product/dtos/products.query.dto';
import { ProductsDto } from '@modules/product/dtos/products.dto';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { ProductVariantsDto } from '@modules/product/dtos/product-variants.dto';
import { PRODUCT_NOT_FOUND } from '@modules/common/constants/errors.constants';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly shopifyAuthSessionService: ShopifyAuthSessionService,
  ) {}

  public static mapProduct(
    product: Product,
  ): ProductDto {
    const {
      legacyResourceId,
      title,
      productType,
      featuredImage,
      priceRangeV2,
      createdAt,
      status,
    } = product;
    return {
      id: legacyResourceId,
      title,
      type: productType || null,
      image: {
        url: featuredImage?.url || null,
        altText: featuredImage?.altText || null,
      },
      price: {
        ...priceRangeV2,
      },
      createdAt,
      status,
    };
  }

  public async getOne(
    shopName: string,
    productId: string,
  ): Promise<ProductDto> {
    const session = await this.shopifyAuthSessionService.getSessionByShopName(shopName)

    const {
      body: {
        data: { product },
      },
    } = await this.productRepository.findOne(session, productId);

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND)
    }

    return ProductService.mapProduct(product);
  }

  public async getMany(
    shopName: string,
    productsQueryDto: ProductsQueryDto,
  ): Promise<ProductsDto> {
    const session = await this.shopifyAuthSessionService.getSessionByShopName(shopName)

    const {
      body: {
        data: {
          products: { nodes, pageInfo },
        },
      },
    } = await this.productRepository.findMany(session, productsQueryDto);

    return {
      products: nodes.map(ProductService.mapProduct),
      pageInfo,
    };
  }

  public async getProductVariants(
    shopName: string,
    productId: string,
    query: ProductsQueryDto,
  ): Promise<ProductVariantsDto> {
    const session = await this.shopifyAuthSessionService.getSessionByShopName(shopName)

    const {
      body: {
        data: {
          productVariants: { nodes, pageInfo },
        },
      },
    } = await this.productRepository.findProductVariants(
      session,
      query,
      productId,
    );

    return {
      productVariants: nodes,
      pageInfo,
    };
  }
}
