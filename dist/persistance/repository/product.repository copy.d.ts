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
    getById(id: number): Promise<Product>;
    findAll(): Promise<Product[]>;
    findAllWithSorting(sort: Sort, sortby: string): Promise<Product[]>;
    findByValue(name: string, author: string): Promise<Product[]>;
    findByName(name: string, sort: Sort): Promise<Product[]>;
    findByProducer(prod: string, sort: Sort, sortby: string): Promise<Product[]>;
    findByText(text: string, sort: Sort): Promise<Product[]>;
}
