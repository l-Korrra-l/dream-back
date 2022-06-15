import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, Slider } from '@prisma/client';
import { SliderForCreate } from './dto/SliderForCreate';
import { SliderRepository } from 'src/persistance/repository/slider.repository';

@Injectable()
export class SliderService {
  constructor(private sliderRepository: SliderRepository) {}

  async createSlider(inputSlider: SliderForCreate): Promise<Slider> {
    return await this.sliderRepository.create(inputSlider);
  }

  async getOne(id: string): Promise<Slider> {
    return await this.sliderRepository.findOne(id);
  }

  async getAll(): Promise<Slider[]> {
    return await this.sliderRepository.findAll();
  }

  async updateSlider(id: string, inputSlider: SliderForCreate) {
    return await this.sliderRepository.update(id, inputSlider);
  }

  async deleteSlider(id: string) {
    return await this.sliderRepository.delete(id);
  }
}
