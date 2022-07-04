import { Injectable } from '@nestjs/common';
import { DiscountSeason, Prisma } from '@prisma/client';
import { DiscountSeasonRepository } from 'src/persistance/repository/discountSeason.repository';

@Injectable()
export class DiscountSeasonService {
  constructor(private discountseasonRepository: DiscountSeasonRepository) {}

  async createDiscountSeason(
    inputDiscountSeason: any,
  ): Promise<DiscountSeason> {
    return await this.discountseasonRepository.create(inputDiscountSeason);
  }

  async deleteDiscountSeason(id: string): Promise<boolean> {
    return await this.discountseasonRepository.delete(id);
  }

  async deleteDiscountSeasonByName(name: string): Promise<boolean> {
    return await this.discountseasonRepository.deleteByName(name);
  }

  async getOne(id: string): Promise<DiscountSeason> {
    return await this.discountseasonRepository.findOne(id);
  }

  async getAll(): Promise<DiscountSeason[]> {
    return await this.discountseasonRepository.findAll();
  }

  async findByName(name: string) {
    return await this.discountseasonRepository.findByName(name);
  }

  async updateDiscountSeason(
    discountseasonId: string,
    discountseasonForUpdate: any,
  ) {
    return await this.discountseasonRepository.update(
      discountseasonId,
      discountseasonForUpdate,
    );
  }
}
