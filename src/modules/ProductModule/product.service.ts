import { ForbiddenException, Injectable } from '@nestjs/common';
import { ProductForCreate } from './dto/productforcreate.dto';
import { Prisma, Product } from '@prisma/client';
import { ProductRepository } from 'src/persistance/repository/product.repository';
import { SaveImageInfo, StatsInfo } from 'src/types/types';
import { Sort } from 'src/enums/sort.enum';
import { ReviewFromUser } from './dto/reviewformuser.dto';
import { ReviewRepository } from 'src/persistance/repository/review.repository';
import { ProductForUpdate } from './dto/productforupdate.dto';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private reviewRepository: ReviewRepository,
  ) {}

  async createProduct(inputProduct: ProductForCreate): Promise<Product> {
    const product = await this.productRepository.create({
      raiting: 0,
      ...inputProduct,
    } as Prisma.ProductCreateInput);

    return product;
  }

  async getOne(id: string): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  async getAll(sort: Sort): Promise<Product[]> {
    return await this.productRepository.findAllWithSorting(sort);
  }

  async findByValue(name: string, author: string) {
    return await this.productRepository.findByValue(name, author);
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
}
