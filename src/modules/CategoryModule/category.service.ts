import { ForbiddenException, Injectable } from '@nestjs/common';
import { Category, Prisma, Product } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { CategoryRepository } from 'src/persistance/repository/category.repository';
import { CategoryForCreate } from './dto/categoryforcreate.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async createCategory(inputCategory: CategoryForCreate): Promise<Category> {
    const product = await this.categoryRepository.create(inputCategory);
    return product;
  }

  async getOne(id: string): Promise<Category> {
    return await this.categoryRepository.findOne(id);
  }

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async delete(id: string): Promise<boolean> {
    return await this.categoryRepository.delete(id);
  }

  async updateCategory(id: string, categoryForUpdate: CategoryForCreate) {
    return await this.categoryRepository.update(id, categoryForUpdate);
  }
}
