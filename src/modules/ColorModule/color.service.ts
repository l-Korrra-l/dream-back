import { Injectable } from '@nestjs/common';
import { Color, Prisma } from '@prisma/client';
import { ColorRepository } from 'src/persistance/repository/color.repository';

@Injectable()
export class ColorService {
  constructor(private colorRepository: ColorRepository) {}

  async createColor(inputColor: any): Promise<Color> {
    return await this.colorRepository.create(inputColor);
  }

  async deleteColor(id: string): Promise<boolean> {
    return await this.colorRepository.delete(id);
  }

  async deleteColorByProduct(id: string): Promise<boolean> {
    return await this.colorRepository.deleteByProduct(id);
  }
  async deleteColorByProductAndName(
    id: string,
    name: string,
  ): Promise<boolean> {
    return await this.colorRepository.deleteByProductAndName(id, name);
  }

  async getOne(id: string): Promise<Color> {
    return await this.colorRepository.findOne(id);
  }

  async getAll(): Promise<Color[]> {
    return await this.colorRepository.findAll();
  }

  async findByProduct(id: number): Promise<Color[]> {
    return await this.colorRepository.findByProduct(id);
  }

  async findByValue(name: string) {
    return await this.colorRepository.findByValue(name);
  }

  async updateColor(colorId: string, colorForUpdate: any, newImage: string) {
    const color = await this.colorRepository.findOne(colorId);
    colorForUpdate.img_path = newImage;
    return await this.colorRepository.update(colorId, colorForUpdate);
  }
}
