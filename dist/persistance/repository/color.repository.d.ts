import { Prisma, Color } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
export declare class ColorRepository implements Repository<string, Prisma.ColorCreateInput, Prisma.ColorUpdateInput, Color> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ColorCreateInput): Promise<Color>;
    update(id: string, data: Prisma.ColorUpdateInput): Promise<Color>;
    delete(id: string): Promise<boolean>;
    deleteByProduct(id: string): Promise<boolean>;
    deleteByProductAndName(id: string, name: string): Promise<boolean>;
    findOne(id: string): Promise<Color>;
    getById(id: number): Promise<Color>;
    findAll(): Promise<Color[]>;
    findByValue(name: string): Promise<Color[]>;
    findByProduct(id: string): Promise<Color[]>;
}
