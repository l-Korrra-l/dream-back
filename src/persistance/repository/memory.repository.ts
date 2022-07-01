import { Injectable } from '@nestjs/common';
import { Prisma, Memory } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { NotFound } from 'src/errors/errors';

@Injectable()
export class MemoryRepository
  implements
    Repository<
      string,
      Prisma.MemoryCreateInput,
      Prisma.MemoryUpdateInput,
      Memory
    >
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.MemoryCreateInput): Promise<Memory> {
    const memory = await this.prisma.memory.create({
      data,
    });

    return memory;
  }

  async update(id: string, data: Prisma.MemoryUpdateInput): Promise<Memory> {
    return await this.prisma.memory.update({
      where: {
        id: Number(id),
      },
      data,
    });
  }

  async delete(id: string): Promise<boolean> {
    const memory = await this.prisma.memory.delete({
      where: {
        id: Number(id),
      },
    });

    if (memory) {
      return true;
    }

    throw new NotFound('Not found memory for delete');
  }

  async deleteByProduct(id: string): Promise<boolean> {
    const memory = await this.prisma.memory.deleteMany({
      where: {
        prodId: Number(id),
      },
    });

    if (memory) {
      return true;
    }

    throw new NotFound('Not found memory for delete');
  }

  async deleteByProductAndName(id: string, name: string): Promise<boolean> {
    const memory = await this.prisma.memory.deleteMany({
      where: {
        prodId: Number(id),
        size: {
          contains: name,
        },
      },
    });

    if (memory) {
      return true;
    }

    throw new NotFound('Not found memory for delete');
  }

  async findOne(id: string): Promise<Memory> {
    const memory = await this.prisma.memory.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (memory) {
      return memory;
    }

    throw new NotFound('Not found memory');
  }

  async getById(id: number): Promise<Memory> {
    const memory = await this.prisma.memory.findFirst({
      where: {
        id: id,
      },
    });

    if (memory) {
      return memory;
    }

    throw new NotFound('Not found memory');
  }

  async findAll(): Promise<Memory[]> {
    return await this.prisma.memory.findMany();
  }

  async findByValue(name: string): Promise<Memory[]> {
    return (await this.prisma.memory.findMany({
      where: {
        size: {
          contains: name,
        },
      },
    })) as unknown as Memory[];
  }

  async findByProduct(id: string): Promise<Memory[]> {
    return (await this.prisma.memory.findMany({
      where: {
        prodId: Number(id),
      },
    })) as unknown as Memory[];
  }
}
