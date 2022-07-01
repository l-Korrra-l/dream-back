import { Prisma, Material } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
export declare class MaterialRepository implements Repository<string, Prisma.MaterialCreateInput, Prisma.MaterialUpdateInput, Material> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.MaterialCreateInput): Promise<Material>;
    update(id: string, data: Prisma.MaterialUpdateInput): Promise<Material>;
    delete(id: string): Promise<boolean>;
    deleteByProduct(id: string): Promise<boolean>;
    deleteByProductAndName(id: string, name: string): Promise<boolean>;
    findOne(id: string): Promise<Material>;
    getById(id: number): Promise<Material>;
    findAll(): Promise<Material[]>;
    findByValue(name: string): Promise<Material[]>;
    findByProduct(id: string): Promise<Material[]>;
}
