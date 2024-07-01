import { Injectable } from '@nestjs/common';
import { Session } from '@shopify/shopify-api';
import { ProductRepository } from '@modules/product/product.repository';
import { ProductDto } from '@modules/product/dtos/product.dto';
import { Product } from '@modules/product/interfaces/product.interface';
import { ProductsQueryDto } from '@modules/product/dtos/products.query.dto';
import { ProductsDto } from '@modules/product/dtos/products.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

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
    session: Session,
    productId: string,
  ): Promise<ProductDto | null> {
    const {
      body: {
        data: { product },
      },
    } = await this.productRepository.findOne(session, productId);

    return product
      ? ProductService.mapProduct(product)
      : null;
  }

  public async getMany(
    session: Session,
    query: ProductsQueryDto,
  ): Promise<ProductsDto> {
    const {
      body: {
        data: {
          products: { nodes, pageInfo },
        },
      },
    } = await this.productRepository.findMany(session, query);

    return {
      products: nodes.map(ProductService.mapProduct),
      pageInfo,
    };
  }
}
