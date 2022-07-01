import { Injectable } from '@nestjs/common';
import { Memory, Prisma } from '@prisma/client';
import { MemoryRepository } from 'src/persistance/repository/memory.repository';

@Injectable()
export class MemoryService {
  constructor(private memoryRepository: MemoryRepository) {}

  async createMemory(inputMemory: any): Promise<Memory> {
    return await this.memoryRepository.create(inputMemory);
  }

  async deleteMemory(id: string): Promise<boolean> {
    return await this.memoryRepository.delete(id);
  }

  async deleteMemoryByProduct(id: string): Promise<boolean> {
    return await this.memoryRepository.deleteByProduct(id);
  }
  async deleteMemoryByProductAndName(
    id: string,
    name: string,
  ): Promise<boolean> {
    return await this.memoryRepository.deleteByProductAndName(id, name);
  }

  async getOne(id: string): Promise<Memory> {
    return await this.memoryRepository.findOne(id);
  }

  async getAll(): Promise<Memory[]> {
    return await this.memoryRepository.findAll();
  }

  async findByProduct(id: string): Promise<Memory[]> {
    return await this.memoryRepository.findByProduct(id);
  }

  async findByValue(name: string) {
    return await this.memoryRepository.findByValue(name);
  }

  async updateMemory(memoryId: string, memoryForUpdate: any, newImage: string) {
    const memory = await this.memoryRepository.findOne(memoryId);
    memoryForUpdate.img_path = newImage;
    return await this.memoryRepository.update(memoryId, memoryForUpdate);
  }
}
