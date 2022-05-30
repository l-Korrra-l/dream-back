import { Injectable } from '@nestjs/common';
import { Repository } from './repository.interface';
import { Bucket, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { OrderRepository } from './order.repository';

@Injectable()
export class BucketRepository
  implements
    Repository<
      string,
      Prisma.BucketCreateInput,
      Prisma.BucketUpdateInput,
      Bucket
    >
{
  constructor(
    private prisma: PrismaService,
    private orderRepo: OrderRepository,
  ) {}

  async create(data: Prisma.BucketCreateInput): Promise<Bucket> {
    return await this.prisma.bucket.create({
      data,
    });
  }

  async update(id: string, data: Prisma.BucketUpdateInput): Promise<Bucket> {
    return await this.prisma.bucket.update({
      data,
      where: {
        id: Number(id),
      },
    });
  }

  async findOne(id: string): Promise<Bucket> {
    return await this.prisma.bucket.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  findByOrder(id: string): Promise<Bucket[]> {
    return this.prisma.bucket.findMany({
      where: {
        id: Number(id),
      },
    });
  }

  async deleteByUser(id: string): Promise<Bucket[]> {
    const ord = await this.orderRepo.findByUser(id);
    ord.map(async (o) => {
      await this.prisma.bucket.deleteMany({
        where: {
          orderId: Number(o.id),
        },
      });
    });
    throw new Error('Method not implemented.');
  }

  async deleteByProduct(id: string): Promise<Bucket[]> {
    await this.prisma.bucket.deleteMany({
      where: {
        prodId: Number(id),
      },
    });
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<boolean> {
    if (
      await this.prisma.bucket.deleteMany({
        where: {
          id: Number(id),
        },
      })
    )
      return true;
    else return false;
  }

  async deleteByOrderId(id: string) {
    await this.prisma.bucket.deleteMany({
      where: {
        orderId: Number(id),
      },
    });
  }

  findAll(): Promise<Bucket[]> {
    return this.prisma.bucket.findMany();
  }
}
