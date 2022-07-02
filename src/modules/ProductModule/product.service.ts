import { ForbiddenException, Injectable } from '@nestjs/common';
import { ProductForCreate } from './dto/productforcreate.dto';
import { Prisma, Product } from '@prisma/client';
import { ProductRepository } from 'src/persistance/repository/product.repository';
import { SaveImageInfo, StatsInfo } from 'src/types/types';
import { Sort } from 'src/enums/sort.enum';
import { ReviewFromUser } from './dto/reviewformuser.dto';
import { ReviewRepository } from 'src/persistance/repository/review.repository';
import { ProductForUpdate } from './dto/productforupdate.dto';
import { CategoryRepository } from 'src/persistance/repository/category.repository';
import { CharactValueRepository } from 'src/persistance/repository/charactValue.repository';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private reviewRepository: ReviewRepository,
    private categoryRepository: CategoryRepository,
    private caractValueRepository: CharactValueRepository,
  ) {}

  // async createProduct(inputProduct: ProductForCreate): Promise<Product> {
  async createProduct(inputProduct: any): Promise<Product> {
    const cat = await this.categoryRepository.findOne(
      inputProduct.categoryId.toString(),
    );
    const { categoryId, ...lProduct } = inputProduct;
    const product = await this.productRepository.create({
      raiting: 0,
      // category: cat as Prisma.CategoryCreateNestedOneWithoutProductsInput,
      categoryId: categoryId,
      ...inputProduct,
    });

    const characteristic = await this.caractValueRepository.findByProduct(
      product.id.toString(),
    );

    return product;
  }

  async getOne(id: string): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  async getAll(sort: Sort, sortby: string): Promise<Product[]> {
    return await this.productRepository.findAllWithSorting(sort, sortby);
  }

  async findByValue(name: string, author: string) {
    return await this.productRepository.findByValue(name, author);
  }

  async findByFilters(
    filters: any,
    sort: Sort,
    sortby: string,
  ): Promise<Product[]> {
    let arr;
    if (filters.name != null && filters.name != undefined)
      arr = await this.productRepository.findByName(filters.name, sort);
    else if (filters.text != null && filters.text != undefined)
      arr = await this.productRepository.findByText(filters.text, sort);
    else if (filters.producer != null && filters.producer != undefined)
      return await this.productRepository.findByProducer(
        filters.producer,
        sort,
        sortby,
      );
    if (!filters.min_price) filters.min_price = -1;
    if (!filters.max_price) filters.max_price = Number.MAX_VALUE / 2;
    if (filters.producer != null && filters.producer != undefined)
      arr.map((i) => {
        if (i.producer.includes(filters.producer)) return i;
      });
    return arr.map((i) => {
      if (i.price > filters.min_price && i.price < filters.max_price) return i;
    });
  }

  async makeReview(
    userId: string,
    author: string,
    productId: string,
    review: ReviewFromUser,
  ) {
    const product = await this.productRepository.findWithReviews(productId);

    if (product.reviews.find((rec) => rec.userId == Number(userId))) {
      throw new ForbiddenException('Review for this product already exists');
    }

    const productStats: StatsInfo =
      await this.reviewRepository.getStatsOfProduct(productId);

    const newRaiting = (
      (productStats.sum + review.raiting) /
      (productStats.count + 1)
    ).toFixed(1);

    await this.productRepository.update(productId, {
      raiting: parseFloat(newRaiting),
    });

    return await this.reviewRepository.create({
      prodId: productId,
      userId: userId,
      authorName: author,
      productName: product.name,
      createdDate: new Date(),
      ...review,
    } as unknown as Prisma.ReviewCreateInput);
  }

  async updateProduct(
    productId: string,
    productForUpdate: ProductForUpdate,
    newImage: string,
  ) {
    const product = await this.productRepository.findOne(productId);
    productForUpdate.img_path = newImage;
    return await this.productRepository.update(productId, productForUpdate);
  }

  async updateProductWithoutImage(
    productId: string,
    productForUpdate: ProductForUpdate,
  ) {
    return await this.productRepository.update(productId, productForUpdate);
  }
}
