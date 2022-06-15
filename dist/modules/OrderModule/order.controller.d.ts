import { CurrentUserInfo } from 'src/types/types';
import { OrderService } from './order.service';
import { OrderForCreate } from './dto/OrderForCreate';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    createProduct(user: CurrentUserInfo, orderForCreate: OrderForCreate): Promise<import(".prisma/client").Order>;
    getOrder(id: string): Promise<import(".prisma/client").Order>;
    getAllproducts(user: CurrentUserInfo): Promise<import(".prisma/client").Order[]>;
}
