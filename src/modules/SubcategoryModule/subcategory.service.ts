import { ForbiddenException, Injectable } from '@nestjs/common';
import { Subcategory, Prisma, Product } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { SubcategoryRepository } from 'src/persistance/repository/subcategory.repository';
import { SubcategoryForCreate } from './dto/subcategoryforcreate.dto';

@Injectable()
export class SubcategoryService {
  constructor(private subcategoryRepository: SubcategoryRepository) {}

  async createSubcategory(
    inputSubcategory: SubcategoryForCreate,
  ): Promise<Subcategory> {
    const product = await this.subcategoryRepository.create(inputSubcategory);
    return product;
  }

  async getOne(id: string): Promise<Subcategory> {
    return await this.subcategoryRepository.findOne(id);
  }

  async getAll(): Promise<Subcategory[]> {
    return await this.subcategoryRepository.findAll();
  }

  async delete(id: string): Promise<boolean> {
    return await this.subcategoryRepository.delete(id);
  }

  async updateSubcategory(
    id: string,
    subcategoryForUpdate: SubcategoryForCreate,
  ) {
    return await this.subcategoryRepository.update(id, subcategoryForUpdate);
  }
}
