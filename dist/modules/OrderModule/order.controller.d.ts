import { CurrentUserInfo } from 'src/types/types';
import { OrderService } from './order.service';
import { OrderForCreate } from './dto/OrderForCreate';
import EmailService from '../EmailModule/email.service';
export declare class OrderController {
    private orderService;
    private emailservice;
    constructor(orderService: OrderService, emailservice: EmailService);
    createProduct(user: CurrentUserInfo, orderForCreate: OrderForCreate): Promise<import(".prisma/client").Order>;
    getOrder(id: string): Promise<import(".prisma/client").Order>;
    getAllproducts(user: CurrentUserInfo): Promise<import(".prisma/client").Order[]>;
}
