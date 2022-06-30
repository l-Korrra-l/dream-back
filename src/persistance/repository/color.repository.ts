import { Injectable } from '@nestjs/common';
import { Prisma, Color } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { NotFound } from 'src/errors/errors';

@Injectable()
export class ColorRepository
  implements
    Repository<string, Prisma.ColorCreateInput, Prisma.ColorUpdateInput, Color>
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ColorCreateInput): Promise<Color> {
    const color = await this.prisma.color.create({
      data,
    });

    return color;
  }

  async update(id: string, data: Prisma.ColorUpdateInput): Promise<Color> {
    return await this.prisma.color.update({
      where: {
        id: Number(id),
      },
      data,
    });
  }

  async delete(id: string): Promise<boolean> {
    const color = await this.prisma.color.delete({
      where: {
        id: Number(id),
      },
    });

    if (color) {
      return true;
    }

    throw new NotFound('Not found color for delete');
  }

  async deleteByProduct(id: string): Promise<boolean> {
    const color = await this.prisma.color.deleteMany({
      where: {
        prodId: Number(id),
      },
    });

    if (color) {
      return true;
    }

    throw new NotFound('Not found color for delete');
  }

  async deleteByProductAndName(id: string, name: string): Promise<boolean> {
    const color = await this.prisma.color.deleteMany({
      where: {
        prodId: Number(id),
        color: {
          contains: name,
        },
      },
    });

    if (color) {
      return true;
    }

    throw new NotFound('Not found color for delete');
  }

  async findOne(id: string): Promise<Color> {
    const color = await this.prisma.color.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (color) {
      return color;
    }

    throw new NotFound('Not found color');
  }

  async getById(id: number): Promise<Color> {
    const color = await this.prisma.color.findFirst({
      where: {
        id: id,
      },
    });

    if (color) {
      return color;
    }

    throw new NotFound('Not found color');
  }

  async findAll(): Promise<Color[]> {
    return await this.prisma.color.findMany();
  }

  async findByValue(name: string): Promise<Color[]> {
    return (await this.prisma.color.findMany({
      where: {
        color: {
          contains: name,
        },
      },
    })) as unknown as Color[];
  }

  async findByProduct(id: number): Promise<Color[]> {
    return (await this.prisma.color.findMany({
      where: {
        prodId: id,
      },
    })) as unknown as Color[];
  }
}
