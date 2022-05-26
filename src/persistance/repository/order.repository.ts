import { Injectable } from '@nestjs/common';
import { Repository } from './repository.interface';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
// import { OrderWithRecordAndUser } from 'src/types/prismatypes';

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

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async deleteByRecordOrUserId(id: string) {
    await this.prisma.order.deleteMany({
      where: {
        // OR: [
        // {
        userId: Number(id),
        // },
        //   {
        //     productId: id,
        //   },
        // ],
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

  // async findWithRecordAndUser(id: string): Promise<OrderWithRecordAndUser> {
  //   return await this.prisma.order.findUnique({
  //     where: {
  //       id: id,
  //     },
  //     include: {
  //       user: true,
  //       record: true,
  //     },
  //   });
  // }

  findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
}
