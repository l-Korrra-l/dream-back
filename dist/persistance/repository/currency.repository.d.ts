import { Currency, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
export declare class CurrencyRepository implements Repository<string, Prisma.CurrencyCreateInput, Prisma.CurrencyUpdateInput, Currency> {
    private prisma;
    constructor(prisma: PrismaService);
    delete(id: string): Promise<boolean>;
    findOne(id: string): Promise<Currency>;
    findAll(): Promise<Currency[]>;
    create(data: Prisma.CurrencyCreateInput): Promise<Currency>;
    update(currId: string, data: Prisma.CurrencyUpdateInput): Promise<Currency>;
}
