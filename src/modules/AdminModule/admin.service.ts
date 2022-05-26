import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { OrderRepository } from 'src/persistance/repository/order.repository';
import { ProductRepository } from 'src/persistance/repository/product.repository';
import { ReviewRepository } from 'src/persistance/repository/review.repository';
import { StorageService } from 'src/persistance/repository/storage.repository';
import { UserRepository } from 'src/persistance/repository/user.repository';

@Injectable()
export class AdminService {
  constructor(
    private userRepository: UserRepository,
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository,
    private reviewRepository: ReviewRepository,
    private storageService: StorageService,
  ) {}

  async deleteUser(userId: string) {
    const user = await this.userRepository.findOne(userId);

    if (user.img_path) {
      await this.deleteImage(user.img_path);
    }

    await this.orderRepository.deleteByRecordOrUserId(userId);
    await this.reviewRepository.deleteByRecordOrUserId(userId);
    await this.userRepository.delete(userId);
  }

  async deleteProduct(productId: string) {
    const record: Product = await this.productRepository.findOne(productId);
    // await this.orderRepository.deleteByProductOrUserId(productId);
    // await this.reviewRepository.deleteByProductOrUserId(productId);
    // await this.deleteImage(record.img_path);
    // await this.productRepository.delete(productId);
  }

  async deleteReview(reviewId: string) {
    await this.reviewRepository.delete(reviewId);
  }

  deleteOrder(orderId: string) {
    this.orderRepository.delete(orderId);
  }

  private async deleteImage(img_path: string) {
    await this.storageService.delete(img_path);
  }
}
