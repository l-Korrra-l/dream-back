import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { BucketRepository } from 'src/persistance/repository/bucket.repository';
import { OrderRepository } from 'src/persistance/repository/order.repository';
import { ProductRepository } from 'src/persistance/repository/product.repository';
import { ReviewRepository } from 'src/persistance/repository/review.repository';
import { UserRepository } from 'src/persistance/repository/user.repository';

@Injectable()
export class SearchService {
  constructor(
    private userRepository: UserRepository,
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository,
    private reviewRepository: ReviewRepository,
    private bucketRepository: BucketRepository,
  ) {}


}
