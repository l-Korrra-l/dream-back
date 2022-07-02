import { Prisma, Information } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
export declare class InformationRepository implements Repository<string, Prisma.InformationCreateInput, Prisma.InformationUpdateInput, Information> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.InformationCreateInput): Promise<Information>;
    update(id: string, data: Prisma.InformationUpdateInput): Promise<Information>;
    delete(id: string): Promise<boolean>;
    deleteByProduct(id: string): Promise<boolean>;
    findOne(id: string): Promise<Information>;
    getById(id: number): Promise<Information>;
    findAll(): Promise<Information[]>;
    findByProduct(id: string): Promise<Information[]>;
}
