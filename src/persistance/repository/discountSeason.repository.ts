import { Injectable } from '@nestjs/common';
import { Prisma, DiscountSeason } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { NotFound } from 'src/errors/errors';

@Injectable()
export class DiscountSeasonRepository
  implements
    Repository<
      string,
      Prisma.DiscountSeasonCreateInput,
      Prisma.DiscountSeasonUpdateInput,
      DiscountSeason
    >
{
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.DiscountSeasonCreateInput,
  ): Promise<DiscountSeason> {
    const discountseason = await this.prisma.discountSeason.create({
      data,
    });

    return discountseason;
  }

  async update(
    id: string,
    data: Prisma.DiscountSeasonUpdateInput,
  ): Promise<DiscountSeason> {
    return await this.prisma.discountSeason.update({
      where: {
        id: Number(id),
      },
      data,
    });
  }

  async delete(id: string): Promise<boolean> {
    const discountseason = await this.prisma.discountSeason.delete({
      where: {
        id: Number(id),
      },
    });

    if (discountseason) {
      return true;
    }

    throw new NotFound('Not found discountseason for delete');
  }

  async deleteByName(name: string): Promise<boolean> {
    const discountseason = await this.prisma.discountSeason.deleteMany({
      where: {
        name: name,
      },
    });

    if (discountseason) {
      return true;
    }

    throw new NotFound('Not found discountseason for delete');
  }

  async findOne(id: string): Promise<DiscountSeason> {
    const discountseason = await this.prisma.discountSeason.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (discountseason) {
      return discountseason;
    }

    throw new NotFound('Not found discountseason');
  }

  async getById(id: number): Promise<DiscountSeason> {
    const discountseason = await this.prisma.discountSeason.findFirst({
      where: {
        id: id,
      },
    });

    if (discountseason) {
      return discountseason;
    }

    throw new NotFound('Not found discountseason');
  }

  async findAll(): Promise<DiscountSeason[]> {
    return await this.prisma.discountSeason.findMany();
  }

  async findByName(name: string): Promise<DiscountSeason[]> {
    return (await this.prisma.discountSeason.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    })) as unknown as DiscountSeason[];
  }
}
