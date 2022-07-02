import { Injectable } from '@nestjs/common';
import { Section, Prisma } from '@prisma/client';
import { SectionRepository } from 'src/persistance/repository/section.repository';

@Injectable()
export class SectionService {
  constructor(private sectionRepository: SectionRepository) {}

  async createSection(inputSection: any): Promise<Section> {
    return await this.sectionRepository.create(inputSection);
  }

  async deleteSection(id: string): Promise<boolean> {
    return await this.sectionRepository.delete(id);
  }

  async deleteSectionByName(name: string): Promise<boolean> {
    return await this.sectionRepository.deleteByName(name);
  }

  async getOne(id: string): Promise<Section> {
    return await this.sectionRepository.findOne(id);
  }

  async getAll(): Promise<Section[]> {
    return await this.sectionRepository.findAll();
  }

  async findByValue(name: string) {
    return await this.sectionRepository.findByValue(name);
  }

  async updateSection(sectionId: string, sectionForUpdate: any) {
    const section = await this.sectionRepository.findOne(sectionId);
    return await this.sectionRepository.update(sectionId, sectionForUpdate);
  }
}
