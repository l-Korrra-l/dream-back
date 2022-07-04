import { Injectable } from '@nestjs/common';
import { Prisma, Discount } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { NotFound } from 'src/errors/errors';

@Injectable()
export class DiscountRepository
  implements
    Repository<
      string,
      Prisma.DiscountCreateInput,
      Prisma.DiscountUpdateInput,
      Discount
    >
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.DiscountCreateInput): Promise<Discount> {
    const discount = await this.prisma.discount.create({
      data,
    });

    return discount;
  }

  async update(
    id: string,
    data: Prisma.DiscountUpdateInput,
  ): Promise<Discount> {
    return await this.prisma.discount.update({
      where: {
        id: Number(id),
      },
      data,
    });
  }

  async delete(id: string): Promise<boolean> {
    const discount = await this.prisma.discount.delete({
      where: {
        id: Number(id),
      },
    });

    if (discount) {
      return true;
    }

    throw new NotFound('Not found discount for delete');
  }

  async deleteByProduct(id: string): Promise<boolean> {
    const discount = await this.prisma.discount.deleteMany({
      where: {
        prodId: Number(id),
      },
    });

    if (discount) {
      return true;
    }

    throw new NotFound('Not found discount for delete');
  }

  async findOne(id: string): Promise<Discount> {
    const discount = await this.prisma.discount.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (discount) {
      return discount;
    }

    throw new NotFound('Not found discount');
  }

  async getById(id: number): Promise<Discount> {
    const discount = await this.prisma.discount.findFirst({
      where: {
        id: id,
      },
    });

    if (discount) {
      return discount;
    }

    throw new NotFound('Not found discount');
  }

  async findAll(): Promise<Discount[]> {
    return await this.prisma.discount.findMany();
  }

  async findByProduct(id: string): Promise<Discount[]> {
    return (await this.prisma.discount.findMany({
      where: {
        prodId: Number(id),
      },
    })) as unknown as Discount[];
  }
}
