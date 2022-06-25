import { Injectable } from '@nestjs/common';
import { Repository } from './repository.interface';
import { Order_, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class OrderRepository
  implements
    Repository<
      string,
      Prisma.Order_CreateInput,
      Prisma.Order_UpdateInput,
      Order_
    >
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.Order_CreateInput): Promise<Order_> {
    return await this.prisma.order_.create({
      data,
    });
  }

  async update(id: string, data: Prisma.Order_UpdateInput): Promise<Order_> {
    return await this.prisma.order_.update({
      data,
      where: {
        id: Number(id),
      },
    });
  }

  async updateNumId(
    id: number,
    data: Prisma.Order_UpdateInput,
  ): Promise<Order_> {
    return await this.prisma.order_.update({
      data,
      where: {
        id: Number(id),
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    if (
      await this.prisma.order_.deleteMany({
        where: {
          id: Number(id),
        },
      })
    )
      return true;
    else return false;
  }

  async deleteByUserId(id: string) {
    await this.prisma.order_.deleteMany({
      where: {
        userId: Number(id),
      },
    });
  }

  async findOne(id: string): Promise<Order_> {
    return await this.prisma.order_.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async findByUser(id: string): Promise<Order_[]> {
    return await this.prisma.order_.findMany({
      where: {
        userId: Number(id),
      },
    });
  }

  async findAll(): Promise<Order_[]> {
    return await this.prisma.order_.findMany({
      select: {
        id: true,
        userId: true,
        totalCost: true,
        date: true,
        status: true,
        user: true,
        buckets: true,
      },
    });
  }
}
