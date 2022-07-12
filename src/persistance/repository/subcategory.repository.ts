import { Injectable } from '@nestjs/common';
import { Subcategory, Prisma} from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { NotFound } from 'src/errors/errors';

@Injectable()
export class SubcategoryRepository
  implements
    Repository<
      string,
      Prisma.SubcategoryCreateInput,
      Prisma.SubcategoryUpdateInput,
      Subcategory
    >
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.SubcategoryCreateInput): Promise<Subcategory> {
    const subcategory = await this.prisma.subcategory.create({
      data,
    });

    return subcategory;
  }

  async update(
    id: string,
    data: Prisma.SubcategoryUpdateInput,
  ): Promise<Subcategory> {
    return await this.prisma.subcategory.update({
      where: {
        id: Number(id),
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
      data,
    });
  }

  async updateN(
    id: number,
    data: Prisma.SubcategoryUpdateInput,
  ): Promise<Subcategory> {
    return await this.prisma.subcategory.update({
      where: {
        id: id,
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
      data,
    });
  }

  async findOne(id: string): Promise<Subcategory> {
    const subcategory = await this.prisma.subcategory.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (subcategory) {
      return subcategory;
    }

    throw new NotFound('Not found subcategory');
  }

  async findAll(): Promise<Subcategory[]> {
    return await this.prisma.subcategory.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    const subcategory = await this.prisma.subcategory.delete({
      where: {
        id: Number(id),
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (subcategory) {
      return true;
    }

    throw new NotFound('Not found subcategory for delete');
  }
}
