import { Injectable } from '@nestjs/common';
import { Prisma, Section } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { NotFound } from 'src/errors/errors';

@Injectable()
export class SectionRepository
  implements
    Repository<
      string,
      Prisma.SectionCreateInput,
      Prisma.SectionUpdateInput,
      Section
    >
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.SectionCreateInput): Promise<Section> {
    const section = await this.prisma.section.create({
      data,
    });

    return section;
  }

  async update(id: string, data: Prisma.SectionUpdateInput): Promise<Section> {
    return await this.prisma.section.update({
      where: {
        id: Number(id),
      },

      data,
    });
  }

  async delete(id: string): Promise<boolean> {
    const section = await this.prisma.section.delete({
      where: {
        id: Number(id),
      },
    });

    if (section) {
      return true;
    }

    throw new NotFound('Not found section for delete');
  }

  async deleteByName(id: string): Promise<boolean> {
    const section = await this.prisma.section.deleteMany({
      where: {
        value: id,
      },
    });

    if (section) {
      return true;
    }

    throw new NotFound('Not found section for delete');
  }

  async findOne(id: string): Promise<Section> {
    const section = await this.prisma.section.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (section) {
      return section;
    }

    throw new NotFound('Not found section');
  }

  async getById(id: number): Promise<Section> {
    const section = await this.prisma.section.findFirst({
      where: {
        id: id,
      },
    });

    if (section) {
      return section;
    }

    throw new NotFound('Not found section');
  }

  async findAll(): Promise<Section[]> {
    return await this.prisma.section.findMany({});
  }

  async findByValue(name: string): Promise<Section[]> {
    return (await this.prisma.section.findMany({
      where: {
        value: {
          contains: name,
        },
      },
    })) as unknown as Section[];
  }
}
