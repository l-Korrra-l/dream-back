import { Prisma, DiscountSeason } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
export declare class DiscountSeasonRepository implements Repository<string, Prisma.DiscountSeasonCreateInput, Prisma.DiscountSeasonUpdateInput, DiscountSeason> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.DiscountSeasonCreateInput): Promise<DiscountSeason>;
    update(id: string, data: Prisma.DiscountSeasonUpdateInput): Promise<DiscountSeason>;
    delete(id: string): Promise<boolean>;
    deleteByName(name: string): Promise<boolean>;
    findOne(id: string): Promise<DiscountSeason>;
    getById(id: number): Promise<DiscountSeason>;
    findAll(): Promise<DiscountSeason[]>;
    findByName(name: string): Promise<DiscountSeason[]>;
}
