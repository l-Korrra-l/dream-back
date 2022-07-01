import { Injectable } from '@nestjs/common';
import { Material, Prisma } from '@prisma/client';
import { MaterialRepository } from 'src/persistance/repository/material.repository';

@Injectable()
export class MaterialService {
  constructor(private materialRepository: MaterialRepository) {}

  async createMaterial(inputMaterial: any): Promise<Material> {
    return await this.materialRepository.create(inputMaterial);
  }

  async deleteMaterial(id: string): Promise<boolean> {
    return await this.materialRepository.delete(id);
  }

  async deleteMaterialByProduct(id: string): Promise<boolean> {
    return await this.materialRepository.deleteByProduct(id);
  }
  async deleteMaterialByProductAndName(
    id: string,
    name: string,
  ): Promise<boolean> {
    return await this.materialRepository.deleteByProductAndName(id, name);
  }

  async getOne(id: string): Promise<Material> {
    return await this.materialRepository.findOne(id);
  }

  async getAll(): Promise<Material[]> {
    return await this.materialRepository.findAll();
  }

  async findByProduct(id: string): Promise<Material[]> {
    return await this.materialRepository.findByProduct(id);
  }

  async findByValue(name: string) {
    return await this.materialRepository.findByValue(name);
  }

  async updateMaterial(
    materialId: string,
    materialForUpdate: any,
    newImage: string,
  ) {
    const material = await this.materialRepository.findOne(materialId);
    materialForUpdate.img_path = newImage;
    return await this.materialRepository.update(materialId, materialForUpdate);
  }
}
