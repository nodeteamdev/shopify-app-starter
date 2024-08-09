import { PRODUCT_NOT_FOUND } from '@modules/common/constants/errors.constants';
import { ProductVariantsDto } from '@modules/product/dtos/product-variants.dto';
import { ProductDto } from '@modules/product/dtos/product.dto';
import { ProductsDto } from '@modules/product/dtos/products.dto';
import { ProductsQueryDto } from '@modules/product/dtos/products.query.dto';
import { Product } from '@modules/product/interfaces/product.interface';
import { ShopifyProductRepository } from '@modules/product/shopify-product.repository';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    private readonly shopifyProductRepository: ShopifyProductRepository,
    private readonly shopifyAuthSessionService: ShopifyAuthSessionService,
  ) {}

  public static mapProduct(product: Product): ProductDto {
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
    const shopifySession =
      await this.shopifyAuthSessionService.getShopifySessionByShopName(
        shopName,
      );

    const {
      body: {
        data: { product },
      },
    } = await this.shopifyProductRepository.findOne(shopifySession, productId);

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }

    return ProductService.mapProduct(product);
  }

  public async getProductRecommendations(shopName: string, productId: string) {
    const shopifySession =
      await this.shopifyAuthSessionService.getOfflineShopifySession(shopName);

    return this.shopifyProductRepository.getRecommendedProducts(
      shopifySession,
      productId,
    );
  }

  public async getMany(
    shopName: string,
    productsQueryDto: ProductsQueryDto,
  ): Promise<ProductsDto> {
    const shopifySession =
      await this.shopifyAuthSessionService.getShopifySessionByShopName(
        shopName,
      );

    const {
      body: {
        data: {
          products: { nodes, pageInfo },
        },
      },
    } = await this.shopifyProductRepository.findMany(
      shopifySession,
      productsQueryDto,
    );

    return {
      products: nodes.map(ProductService.mapProduct),
      pageInfo,
    };
  }

  public async productsCount(shopName: string): Promise<{ count: number }> {
    const session =
      await this.shopifyAuthSessionService.getShopifySessionByShopName(
        shopName,
      );

    const data: any = await this.shopifyProductRepository.count(session);
    return { count: data.body.data.productsCount.count };
  }

  public async getProductVariants(
    shopName: string,
    productId: string,
    query: ProductsQueryDto,
  ): Promise<ProductVariantsDto> {
    const shopifySession =
      await this.shopifyAuthSessionService.getShopifySessionByShopName(
        shopName,
      );

    const {
      body: {
        data: {
          productVariants: { nodes, pageInfo },
        },
      },
    } = await this.shopifyProductRepository.findProductVariants(
      shopifySession,
      query,
      productId,
    );

    return {
      productVariants: nodes,
      pageInfo,
    };
  }
}
