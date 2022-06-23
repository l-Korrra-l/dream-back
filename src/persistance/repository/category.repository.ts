import { Injectable } from '@nestjs/common';
import { Category, Prisma, Slider } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { NotFound } from 'src/errors/errors';
import { ProductWithReviews } from 'src/types/prismatypes';

@Injectable()
export class CategoryRepository
  implements
    Repository<
      string,
      Prisma.CategoryCreateInput,
      Prisma.CategoryUpdateInput,
      Category
    >
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    const category = await this.prisma.category.create({
      data,
    });

    return category;
  }

  async update(
    id: string,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return await this.prisma.category.update({
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
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return await this.prisma.category.update({
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

  async findOne(id: string): Promise<Category> {
    const slider = await this.prisma.category.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (slider) {
      return slider;
    }

    throw new NotFound('Not found slider');
  }

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    const slider = await this.prisma.category.delete({
      where: {
        id: Number(id),
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (slider) {
      return true;
    }

    throw new NotFound('Not found slider for delete');
  }
}
