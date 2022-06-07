import { Repository } from './repository.interface';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
export declare class OrderRepository implements Repository<string, Prisma.OrderCreateInput, Prisma.OrderUpdateInput, Order> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.OrderCreateInput): Promise<Order>;
    update(id: string, data: Prisma.OrderUpdateInput): Promise<Order>;
    delete(id: string): Promise<boolean>;
    deleteByUserId(id: string): Promise<void>;
    findOne(id: string): Promise<Order>;
    findByUser(id: string): Promise<Order[]>;
    findAll(): Promise<Order[]>;
}
