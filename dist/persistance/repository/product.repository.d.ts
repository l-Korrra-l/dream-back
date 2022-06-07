import { Prisma, Product } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { ProductWithReviews } from 'src/types/prismatypes';
export declare class ProductRepository implements Repository<string, Prisma.ProductCreateInput, Prisma.ProductUpdateInput, Product> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ProductCreateInput): Promise<Product>;
    update(id: string, data: Prisma.ProductUpdateInput): Promise<Product>;
    delete(id: string): Promise<boolean>;
    findOne(id: string): Promise<Product>;
    findWithReviews(id: string): Promise<ProductWithReviews>;
    findAll(): Promise<Product[]>;
    findAllWithSorting(sort: Sort): Promise<Product[]>;
    findByValue(name: string, author: string): Promise<Product[]>;
}
