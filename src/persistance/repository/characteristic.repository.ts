import { Injectable } from '@nestjs/common';
import { Prisma, Characteristic } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { NotFound } from 'src/errors/errors';

@Injectable()
export class CharacteristicRepository
  implements
    Repository<
      string,
      Prisma.CharacteristicCreateInput,
      Prisma.CharacteristicUpdateInput,
      Characteristic
    >
{
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.CharacteristicCreateInput,
  ): Promise<Characteristic> {
    const characteristic = await this.prisma.characteristic.create({
      include: {
        section: true,
      },
      data,
    });

    return characteristic;
  }

  async update(
    id: string,
    data: Prisma.CharacteristicUpdateInput,
  ): Promise<Characteristic> {
    return await this.prisma.characteristic.update({
      where: {
        id: Number(id),
      },
      include: {
        section: true,
      },
      data,
    });
  }

  async delete(id: string): Promise<boolean> {
    const characteristic = await this.prisma.characteristic.delete({
      where: {
        id: Number(id),
      },
    });

    if (characteristic) {
      return true;
    }

    throw new NotFound('Not found characteristic for delete');
  }

  async deleteByName(id: string): Promise<boolean> {
    const characteristic = await this.prisma.characteristic.deleteMany({
      where: {
        name: id,
      },
    });

    if (characteristic) {
      return true;
    }

    throw new NotFound('Not found characteristic for delete');
  }

  async deleteBySection(id: string): Promise<boolean> {
    const characteristic = await this.prisma.characteristic.deleteMany({
      where: {
        sectionId: Number(id),
      },
    });

    if (characteristic) {
      return true;
    }

    throw new NotFound('Not found characteristic for delete');
  }

  async findOne(id: string): Promise<Characteristic> {
    const characteristic = await this.prisma.characteristic.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        section: true,
      },
    });

    if (characteristic) {
      return characteristic;
    }

    throw new NotFound('Not found characteristic');
  }

  async getById(id: number): Promise<Characteristic> {
    const characteristic = await this.prisma.characteristic.findFirst({
      where: {
        id: id,
      },
      include: {
        section: true,
      },
    });

    if (characteristic) {
      return characteristic;
    }

    throw new NotFound('Not found characteristic');
  }

  async findAll(): Promise<Characteristic[]> {
    return await this.prisma.characteristic.findMany({
      include: {
        section: true,
      },
    });
  }

  async findByValue(name: string): Promise<Characteristic[]> {
    return (await this.prisma.characteristic.findMany({
      include: {
        section: true,
      },
      where: {
        name: {
          contains: name,
        },
      },
    })) as unknown as Characteristic[];
  }
}
