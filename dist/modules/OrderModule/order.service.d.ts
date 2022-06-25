import { Order_ } from '@prisma/client';
import { OrderRepository } from 'src/persistance/repository/order.repository';
import { BucketRepository } from 'src/persistance/repository/bucket.repository';
import { OrderForCreate } from './dto/OrderForCreate';
import { UserRepository } from 'src/persistance/repository/user.repository';
import { ProductRepository } from 'src/persistance/repository/product.repository';
import { CurrentUserInfo } from 'src/types/types';
export declare class OrderService {
    private orderRepository;
    private bucketRepository;
    private userRepository;
    private productRepository;
    constructor(orderRepository: OrderRepository, bucketRepository: BucketRepository, userRepository: UserRepository, productRepository: ProductRepository);
    createOrder(inputOrder: OrderForCreate, userId: string): Promise<Order_>;
    getOne(id: string): Promise<Order_>;
    getAll(user: CurrentUserInfo): Promise<Order_[]>;
    updateOrder(): Promise<void>;
}
