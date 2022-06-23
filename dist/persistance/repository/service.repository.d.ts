import { Prisma, Service } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { ServiceWithReviews } from 'src/types/prismatypes';
export declare class ServiceRepository implements Repository<string, Prisma.ServiceCreateInput, Prisma.ServiceUpdateInput, Service> {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ServiceCreateInput): Promise<Service>;
    update(id: string, data: Prisma.ServiceUpdateInput): Promise<Service>;
    delete(id: string): Promise<boolean>;
    findOne(id: string): Promise<Service>;
    getById(id: number): Promise<Service>;
    findAll(): Promise<Service[]>;
    findAllWithSorting(sort: Sort, sortby: string): Promise<Service[]>;
    findByValue(name: string, author: string): Promise<Service[]>;
    findByName(name: string, sort: Sort): Promise<Service[]>;
    findWithReviews(id: string): Promise<ServiceWithReviews>;
    findByText(text: string, sort: Sort): Promise<Service[]>;
}
