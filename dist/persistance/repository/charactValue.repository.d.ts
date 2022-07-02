import { Prisma, CharactValue } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
export declare class CharactValueRepository implements Repository<string, Prisma.CharactValueCreateInput, Prisma.CharactValueUpdateInput, CharactValue> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.CharactValueCreateInput): Promise<CharactValue>;
    update(id: string, data: Prisma.CharactValueUpdateInput): Promise<CharactValue>;
    delete(id: string): Promise<boolean>;
    deleteByProduct(id: string): Promise<boolean>;
    deleteByProductAndValue(id: string, value: string): Promise<boolean>;
    deleteByCharact(id: string): Promise<boolean>;
    findOne(id: string): Promise<CharactValue>;
    getById(id: number): Promise<CharactValue>;
    findAll(): Promise<CharactValue[]>;
    findByValue(name: string): Promise<CharactValue[]>;
    findByProduct(name: string): Promise<CharactValue[]>;
    findByProductGroupByValue(id: string): Promise<any[]>;
}
