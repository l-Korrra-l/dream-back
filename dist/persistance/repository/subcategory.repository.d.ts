import { Subcategory, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
export declare class SubcategoryRepository implements Repository<string, Prisma.SubcategoryCreateInput, Prisma.SubcategoryUpdateInput, Subcategory> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.SubcategoryCreateInput): Promise<Subcategory>;
    update(id: string, data: Prisma.SubcategoryUpdateInput): Promise<Subcategory>;
    updateN(id: number, data: Prisma.SubcategoryUpdateInput): Promise<Subcategory>;
    findOne(id: string): Promise<Subcategory>;
    findAll(): Promise<Subcategory[]>;
    delete(id: string): Promise<boolean>;
}
