import { Injectable } from '@nestjs/common';
import { Currency, Prisma } from '@prisma/client';
import { truncate } from 'fs/promises';
import { PrismaService } from 'nestjs-prisma';
import { NotFound } from 'src/errors/errors';
//import { PrismaService } from '../prisma.service';
import { Repository } from './repository.interface';

@Injectable()
export class CurrencyRepository
  implements
    Repository<
      string,
      Prisma.CurrencyCreateInput,
      Prisma.CurrencyUpdateInput,
      Currency
    >
{
  constructor(private prisma: PrismaService) {}
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async findOne(id: string): Promise<Currency> {
    return await this.prisma.currency.findFirst();
  }
  async findAll(): Promise<Currency[]> {
    return await this.prisma.currency.findMany();
  }

  async create(data: Prisma.CurrencyCreateInput): Promise<Currency> {
    console.log(data);
    const currency = await this.prisma.currency.create({
      data,
    });

    return currency;
  }

  async update(
    currId: string,
    data: Prisma.CurrencyUpdateInput,
  ): Promise<Currency> {
    return (await this.prisma.currency.update({
      select: {
        id: true,
        rate: true,
        date: true,
      },
      where: {
        id: Number(currId),
      },
      data,
    })) as unknown as Currency;
  }
}
