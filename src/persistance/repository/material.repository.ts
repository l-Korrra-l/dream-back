import { Injectable } from '@nestjs/common';
import { Prisma, Material } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { NotFound } from 'src/errors/errors';

@Injectable()
export class MaterialRepository
  implements
    Repository<
      string,
      Prisma.MaterialCreateInput,
      Prisma.MaterialUpdateInput,
      Material
    >
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.MaterialCreateInput): Promise<Material> {
    const material = await this.prisma.material.create({
      data,
    });

    return material;
  }

  async update(
    id: string,
    data: Prisma.MaterialUpdateInput,
  ): Promise<Material> {
    return await this.prisma.material.update({
      where: {
        id: Number(id),
      },
      data,
    });
  }

  async delete(id: string): Promise<boolean> {
    const material = await this.prisma.material.delete({
      where: {
        id: Number(id),
      },
    });

    if (material) {
      return true;
    }

    throw new NotFound('Not found material for delete');
  }

  async findOne(id: string): Promise<Material> {
    const material = await this.prisma.material.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (material) {
      return material;
    }

    throw new NotFound('Not found material');
  }

  async getById(id: number): Promise<Material> {
    const material = await this.prisma.material.findFirst({
      where: {
        id: id,
      },
    });

    if (material) {
      return material;
    }

    throw new NotFound('Not found material');
  }

  async findAll(): Promise<Material[]> {
    return await this.prisma.material.findMany();
  }

  async findByValue(name: string): Promise<Material[]> {
    return (await this.prisma.material.findMany({
      where: {
        material: {
          contains: name,
        },
      },
    })) as unknown as Material[];
  }
}
