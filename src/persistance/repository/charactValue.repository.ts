import { Injectable } from '@nestjs/common';
import { Prisma, CharactValue } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from './repository.interface';
import { NotFound } from 'src/errors/errors';

@Injectable()
export class CharactValueRepository
  implements
    Repository<
      string,
      Prisma.CharactValueCreateInput,
      Prisma.CharactValueUpdateInput,
      CharactValue
    >
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CharactValueCreateInput): Promise<CharactValue> {
    const charactvalue = await this.prisma.charactValue.create({
      data,
    });

    return charactvalue;
  }

  async update(
    id: string,
    data: Prisma.CharactValueUpdateInput,
  ): Promise<CharactValue> {
    return await this.prisma.charactValue.update({
      where: {
        id: Number(id),
      },
      data,
    });
  }

  async delete(id: string): Promise<boolean> {
    const charactvalue = await this.prisma.charactValue.delete({
      where: {
        id: Number(id),
      },
    });

    if (charactvalue) {
      return true;
    }

    throw new NotFound('Not found charactvalue for delete');
  }

  async deleteByProduct(id: string): Promise<boolean> {
    const charactvalue = await this.prisma.charactValue.deleteMany({
      where: {
        prodId: Number(id),
      },
    });

    if (charactvalue) {
      return true;
    }

    throw new NotFound('Not found charactvalue for delete');
  }

  async deleteByProductAndValue(id: string, value: string): Promise<boolean> {
    const charactvalue = await this.prisma.charactValue.deleteMany({
      where: {
        prodId: Number(id),
        value: value,
      },
    });

    if (charactvalue) {
      return true;
    }

    throw new NotFound('Not found charactvalue for delete');
  }

  async deleteByCharact(id: string): Promise<boolean> {
    const charactvalue = await this.prisma.charactValue.deleteMany({
      where: {
        charactId: Number(id),
      },
    });

    if (charactvalue) {
      return true;
    }

    throw new NotFound('Not found charactvalue for delete');
  }

  async findOne(id: string): Promise<CharactValue> {
    const charactvalue = await this.prisma.charactValue.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (charactvalue) {
      return charactvalue;
    }

    throw new NotFound('Not found charactvalue');
  }

  async getById(id: number): Promise<CharactValue> {
    const charactvalue = await this.prisma.charactValue.findFirst({
      where: {
        id: id,
      },
    });

    if (charactvalue) {
      return charactvalue;
    }

    throw new NotFound('Not found charactvalue');
  }

  async findAll(): Promise<CharactValue[]> {
    return await this.prisma.charactValue.findMany();
  }

  async findByValue(name: string): Promise<CharactValue[]> {
    return (await this.prisma.charactValue.findMany({
      where: {
        value: {
          contains: name,
        },
      },
    })) as unknown as CharactValue[];
  }

  async findByProduct(name: string): Promise<CharactValue[]> {
    return (await this.prisma.charactValue.findMany({
      where: {
        prodId: Number(name),
      },
    })) as unknown as CharactValue[];
  }
}
