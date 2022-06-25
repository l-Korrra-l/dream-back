import { Repository } from './repository.interface';
import { Order_, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
export declare class OrderRepository implements Repository<string, Prisma.Order_CreateInput, Prisma.Order_UpdateInput, Order_> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.Order_CreateInput): Promise<Order_>;
    update(id: string, data: Prisma.Order_UpdateInput): Promise<Order_>;
    updateNumId(id: number, data: Prisma.Order_UpdateInput): Promise<Order_>;
    delete(id: string): Promise<boolean>;
    deleteByUserId(id: string): Promise<void>;
    findOne(id: string): Promise<Order_>;
    findByUser(id: string): Promise<Order_[]>;
    findAll(): Promise<Order_[]>;
}
