import { Prisma, Characteristic } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
export declare class CharacteristicRepository implements Repository<string, Prisma.CharacteristicCreateInput, Prisma.CharacteristicUpdateInput, Characteristic> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.CharacteristicCreateInput): Promise<Characteristic>;
    update(id: string, data: Prisma.CharacteristicUpdateInput): Promise<Characteristic>;
    delete(id: string): Promise<boolean>;
    findOne(id: string): Promise<Characteristic>;
    getById(id: number): Promise<Characteristic>;
    findAll(): Promise<Characteristic[]>;
    findByValue(name: String): Promise<Characteristic[]>;
    findByName(name: string, sort: Sort): Promise<Characteristic[]>;
    findByText(text: string, sort: Sort): Promise<Characteristic[]>;
}
