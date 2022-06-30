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

  async findOne(id: string): Promise<Characteristic> {
    const characteristic = await this.prisma.characteristic.findFirst({
      where: {
        id: Number(id),
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
    });

    if (characteristic) {
      return characteristic;
    }

    throw new NotFound('Not found characteristic');
  }

  async findAll(): Promise<Characteristic[]> {
    return await this.prisma.characteristic.findMany();
  }

  async findByValue(name: string): Promise<Characteristic[]> {
    return (await this.prisma.characteristic.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    })) as unknown as Characteristic[];
  }
}
