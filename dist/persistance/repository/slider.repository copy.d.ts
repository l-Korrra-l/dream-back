import { Prisma, Slider } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
export declare class SliderRepository implements Repository<string, Prisma.SliderCreateInput, Prisma.SliderUpdateInput, Slider> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.SliderCreateInput): Promise<Slider>;
    update(id: string, data: Prisma.SliderUpdateInput): Promise<Slider>;
    updateN(id: number, data: Prisma.SliderUpdateInput): Promise<Slider>;
    findOne(id: string): Promise<Slider>;
    findAll(): Promise<Slider[]>;
    delete(id: string): Promise<boolean>;
}
