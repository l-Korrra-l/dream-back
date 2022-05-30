import { Injectable } from '@nestjs/common';
import { Repository } from './repository.interface';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class OrderRepository
  implements
    Repository<string, Prisma.OrderCreateInput, Prisma.OrderUpdateInput, Order>
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.OrderCreateInput): Promise<Order> {
    return await this.prisma.order.create({
      data,
    });
  }

  async update(id: string, data: Prisma.OrderUpdateInput): Promise<Order> {
    return await this.prisma.order.update({
      data,
      where: {
        id: Number(id),
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    if (
      await this.prisma.order.deleteMany({
        where: {
          id: Number(id),
        },
      })
    )
      return true;
    else return false;
  }

  async deleteByUserId(id: string) {
    await this.prisma.order.deleteMany({
      where: {
        userId: Number(id),
      },
    });
  }

  async findOne(id: string): Promise<Order> {
    return await this.prisma.order.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async findByUser(id: string): Promise<Order[]> {
    return await this.prisma.order.findMany({
      where: {
        userId: Number(id),
      },
    });
  }

  findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
}
