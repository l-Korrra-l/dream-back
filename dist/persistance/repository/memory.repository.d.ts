import { Prisma, Memory } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
export declare class MemoryRepository implements Repository<string, Prisma.MemoryCreateInput, Prisma.MemoryUpdateInput, Memory> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.MemoryCreateInput): Promise<Memory>;
    update(id: string, data: Prisma.MemoryUpdateInput): Promise<Memory>;
    delete(id: string): Promise<boolean>;
    deleteByProduct(id: string): Promise<boolean>;
    deleteByProductAndName(id: string, name: string): Promise<boolean>;
    findOne(id: string): Promise<Memory>;
    getById(id: number): Promise<Memory>;
    findAll(): Promise<Memory[]>;
    findByValue(name: string): Promise<Memory[]>;
    findByProduct(id: string): Promise<Memory[]>;
}
