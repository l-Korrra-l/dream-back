import { Injectable } from '@nestjs/common';
import { Prisma, Information } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { NotFound } from 'src/errors/errors';

@Injectable()
export class InformationRepository
  implements
    Repository<string, Prisma.InformationCreateInput, Prisma.InformationUpdateInput, Information>
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.InformationCreateInput): Promise<Information> {
    const information = await this.prisma.information.create({
      data,
    });

    return information;
  }

  async update(id: string, data: Prisma.InformationUpdateInput): Promise<Information> {
    return await this.prisma.information.update({
      where: {
        id: Number(id),
      },
      data,
    });
  }

  async delete(id: string): Promise<boolean> {
    const information = await this.prisma.information.delete({
      where: {
        id: Number(id),
      },
    });

    if (information) {
      return true;
    }

    throw new NotFound('Not found information for delete');
  }

  async deleteByProduct(id: string): Promise<boolean> {
    const information = await this.prisma.information.deleteMany({
      where: {
        prodId: Number(id),
      },
    });

    if (information) {
      return true;
    }

    throw new NotFound('Not found information for delete');
  }

  async findOne(id: string): Promise<Information> {
    const information = await this.prisma.information.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (information) {
      return information;
    }

    throw new NotFound('Not found information');
  }

  async getById(id: number): Promise<Information> {
    const information = await this.prisma.information.findFirst({
      where: {
        id: id,
      },
    });

    if (information) {
      return information;
    }

    throw new NotFound('Not found information');
  }

  async findAll(): Promise<Information[]> {
    return await this.prisma.information.findMany();
  }

  async findByProduct(id: string): Promise<Information[]> {
    return (await this.prisma.information.findMany({
      where: {
        prodId: Number(id),
      },
    })) as unknown as Information[];
  }
}
