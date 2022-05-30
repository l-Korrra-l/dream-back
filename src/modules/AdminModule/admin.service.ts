import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { BucketRepository } from 'src/persistance/repository/bucket.repository';
import { OrderRepository } from 'src/persistance/repository/order.repository';
import { ProductRepository } from 'src/persistance/repository/product.repository';
import { ReviewRepository } from 'src/persistance/repository/review.repository';
import { UserRepository } from 'src/persistance/repository/user.repository';

@Injectable()
export class AdminService {
  constructor(
    private userRepository: UserRepository,
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository,
    private reviewRepository: ReviewRepository,
    private bucketRepository: BucketRepository,
  ) {}

  async deleteUser(userId: string) {
    const user = await this.userRepository.findOne(userId);
    await this.orderRepository.deleteByUserId(userId);
    await this.reviewRepository.deleteByUserId(userId);
    await this.bucketRepository.deleteByUser(userId);
    await this.userRepository.delete(userId);
  }

  async deleteProduct(productId: string) {
    const record: Product = await this.productRepository.findOne(productId);
    await this.orderRepository.deleteByUserId(productId);
    await this.reviewRepository.deleteByUserId(productId);
    await this.productRepository.delete(productId);
  }

  async deleteReview(reviewId: string) {
    await this.reviewRepository.delete(reviewId);
  }

  deleteOrder(orderId: string) {
    this.orderRepository.delete(orderId);
  }
}
