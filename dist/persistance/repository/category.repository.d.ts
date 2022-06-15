import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
export declare class CategoryRepository implements Repository<string, Prisma.CategoryCreateInput, Prisma.CategoryUpdateInput, Category> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.CategoryCreateInput): Promise<Category>;
    update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category>;
    updateN(id: number, data: Prisma.CategoryUpdateInput): Promise<Category>;
    findOne(id: string): Promise<Category>;
    findAll(): Promise<Category[]>;
    delete(id: string): Promise<boolean>;
}
