import { Prisma, Section } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
export declare class SectionRepository implements Repository<string, Prisma.SectionCreateInput, Prisma.SectionUpdateInput, Section> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.SectionCreateInput): Promise<Section>;
    update(id: string, data: Prisma.SectionUpdateInput): Promise<Section>;
    delete(id: string): Promise<boolean>;
    deleteByName(id: string): Promise<boolean>;
    findOne(id: string): Promise<Section>;
    getById(id: number): Promise<Section>;
    findAll(): Promise<Section[]>;
    findByValue(name: string): Promise<Section[]>;
}
