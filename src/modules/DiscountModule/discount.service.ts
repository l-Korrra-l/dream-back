import { Injectable } from '@nestjs/common';
import { Discount, Prisma } from '@prisma/client';
import { DiscountRepository } from 'src/persistance/repository/discount.repository';

@Injectable()
export class DiscountService {
  constructor(private discountRepository: DiscountRepository) {}

  async createDiscount(inputDiscount: any): Promise<Discount> {
    return await this.discountRepository.create(inputDiscount);
  }

  async deleteDiscount(id: string): Promise<boolean> {
    return await this.discountRepository.delete(id);
  }

  async deleteDiscountByProduct(id: string): Promise<boolean> {
    return await this.discountRepository.deleteByProduct(id);
  }

  async getOne(id: string): Promise<Discount> {
    return await this.discountRepository.findOne(id);
  }

  async getAll(): Promise<Discount[]> {
    return await this.discountRepository.findAll();
  }

  async findByProduct(id: string): Promise<Discount[]> {
    return await this.discountRepository.findByProduct(id);
  }

  async updateDiscount(discountId: string, discountForUpdate: any) {
    return await this.discountRepository.update(discountId, discountForUpdate);
  }
}
