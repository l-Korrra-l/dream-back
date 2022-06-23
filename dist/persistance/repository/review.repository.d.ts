import { Repository } from './repository.interface';
import { Prisma, Review } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { StatsInfo } from 'src/types/types';
export declare class ReviewRepository implements Repository<string, Prisma.ReviewCreateInput, Prisma.ReviewUpdateInput, Review> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ReviewCreateInput): Promise<Review>;
    update(id: string, data: Prisma.ReviewUpdateInput): Promise<Review>;
    delete(id: string): Promise<boolean>;
    findOne(id: string): Promise<Review>;
    findAll(): Promise<Review[]>;
    deleteByUserId(id: string): Promise<void>;
    getStatsOfProduct(productId: string): Promise<StatsInfo>;
    getStatsOfService(productId: string): Promise<StatsInfo>;
}
