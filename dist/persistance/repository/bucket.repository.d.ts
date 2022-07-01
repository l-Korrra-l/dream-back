import { Repository } from './repository.interface';
import { Bucket, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { OrderRepository } from './order.repository';
export declare class BucketRepository implements Repository<string, Prisma.BucketCreateInput, Prisma.BucketUpdateInput, Bucket> {
    private prisma;
    private orderRepo;
    constructor(prisma: PrismaService, orderRepo: OrderRepository);
    create(data: any): Promise<Bucket>;
    update(id: string, data: Prisma.BucketUpdateInput): Promise<Bucket>;
    findOne(id: string): Promise<Bucket>;
    findByOrder(id: string): Promise<Bucket[]>;
    deleteByUser(id: string): Promise<Bucket[]>;
    deleteByProduct(id: string): Promise<Bucket[]>;
    delete(id: string): Promise<boolean>;
    deleteByOrderId(id: string): Promise<void>;
    findAll(): Promise<Bucket[]>;
}
