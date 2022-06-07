import { BucketRepository } from 'src/persistance/repository/bucket.repository';
import { OrderRepository } from 'src/persistance/repository/order.repository';
import { ProductRepository } from 'src/persistance/repository/product.repository';
import { ReviewRepository } from 'src/persistance/repository/review.repository';
import { UserRepository } from 'src/persistance/repository/user.repository';
export declare class AdminService {
    private userRepository;
    private productRepository;
    private orderRepository;
    private reviewRepository;
    private bucketRepository;
    constructor(userRepository: UserRepository, productRepository: ProductRepository, orderRepository: OrderRepository, reviewRepository: ReviewRepository, bucketRepository: BucketRepository);
    deleteUser(userId: string): Promise<void>;
    deleteProduct(productId: string): Promise<void>;
    deleteReview(reviewId: string): Promise<void>;
    deleteOrder(orderId: string): void;
}
