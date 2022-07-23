import { ForbiddenException, Injectable } from '@nestjs/common';
import { Currency, Prisma, Product } from '@prisma/client';
import { ProductRepository } from 'src/persistance/repository/product.repository';
import { SaveImageInfo, StatsInfo } from 'src/types/types';
import { Sort } from 'src/enums/sort.enum';
import { CurrencyRepository } from 'src/persistance/repository/currency.repository';

@Injectable()
export class CurrencyService {
  constructor(private currencyRepository: CurrencyRepository) {}

  async createCurrency(currency: string): Promise<Currency> {
    const curr = await this.currencyRepository.create({
      rate: Number(currency),
      date: new Date(),
    } as Prisma.CurrencyCreateInput);

    return curr;
  }

  async getOne(): Promise<Currency> {
    return await this.currencyRepository.findOne('1');
  }

  async updateCurrency(newRate: string) {
    const curr = await this.currencyRepository.update('1', {
      rate: parseFloat(newRate),
      date: new Date(),
    } as Prisma.CurrencyUpdateInput);

    return curr;
  }
}
