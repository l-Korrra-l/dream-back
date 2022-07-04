import { Prisma, Discount } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
export declare class DiscountRepository implements Repository<string, Prisma.DiscountCreateInput, Prisma.DiscountUpdateInput, Discount> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.DiscountCreateInput): Promise<Discount>;
    update(id: string, data: Prisma.DiscountUpdateInput): Promise<Discount>;
    delete(id: string): Promise<boolean>;
    deleteByProduct(id: string): Promise<boolean>;
    findOne(id: string): Promise<Discount>;
    getById(id: number): Promise<Discount>;
    findAll(): Promise<Discount[]>;
    findByProduct(id: string): Promise<Discount[]>;
}
