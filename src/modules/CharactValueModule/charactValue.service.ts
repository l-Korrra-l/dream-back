import { Injectable } from '@nestjs/common';
import { CharactValue, Prisma } from '@prisma/client';
import { CharactValueRepository } from 'src/persistance/repository/charactValue.repository';

@Injectable()
export class CharactValueService {
  constructor(private charactvalueRepository: CharactValueRepository) {}

  async createCharactValue(inputCharactValue: any): Promise<CharactValue> {
    return await this.charactvalueRepository.create(inputCharactValue);
  }

  async deleteCharactValue(id: string): Promise<boolean> {
    return await this.charactvalueRepository.delete(id);
  }

  async deleteCharactValueByProduct(id: string): Promise<boolean> {
    return await this.charactvalueRepository.deleteByProduct(id);
  }
  async deleteCharactValueByProductAndValue(
    id: string,
    name: string,
  ): Promise<boolean> {
    return await this.charactvalueRepository.deleteByProductAndValue(id, name);
  }

  async getOne(id: string): Promise<CharactValue> {
    return await this.charactvalueRepository.findOne(id);
  }

  async getAll(): Promise<CharactValue[]> {
    return await this.charactvalueRepository.findAll();
  }

  async findByProduct(id: string): Promise<CharactValue[]> {
    return await this.charactvalueRepository.findByProduct(id);
  }

  async findByValue(name: string) {
    return await this.charactvalueRepository.findByValue(name);
  }

  async updateCharactValue(charactvalueId: string, charactvalueForUpdate: any) {
    const charactvalue = await this.charactvalueRepository.findOne(
      charactvalueId,
    );
    return await this.charactvalueRepository.update(
      charactvalueId,
      charactvalueForUpdate,
    );
  }
}
