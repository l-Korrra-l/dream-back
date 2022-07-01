import { Injectable } from '@nestjs/common';
import { Characteristic, Prisma } from '@prisma/client';
import { CharacteristicRepository } from 'src/persistance/repository/characteristic.repository';

@Injectable()
export class CharacteristicService {
  constructor(private characteristicRepository: CharacteristicRepository) {}

  async createCharacteristic(
    inputCharacteristic: any,
  ): Promise<Characteristic> {
    return await this.characteristicRepository.create(inputCharacteristic);
  }

  async deleteCharacteristic(id: string): Promise<boolean> {
    return await this.characteristicRepository.delete(id);
  }

  async deleteCharacteristicByName(name: string): Promise<boolean> {
    return await this.characteristicRepository.deleteByName(name);
  }

  async getOne(id: string): Promise<Characteristic> {
    return await this.characteristicRepository.findOne(id);
  }

  async getAll(): Promise<Characteristic[]> {
    return await this.characteristicRepository.findAll();
  }

  async findByValue(name: string) {
    return await this.characteristicRepository.findByValue(name);
  }

  async updateCharacteristic(
    characteristicId: string,
    characteristicForUpdate: any,
  ) {
    const characteristic = await this.characteristicRepository.findOne(
      characteristicId,
    );
    return await this.characteristicRepository.update(
      characteristicId,
      characteristicForUpdate,
    );
  }
}
