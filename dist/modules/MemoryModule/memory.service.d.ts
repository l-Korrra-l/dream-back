import { Memory } from '@prisma/client';
import { MemoryRepository } from 'src/persistance/repository/memory.repository';
export declare class MemoryService {
    private memoryRepository;
    constructor(memoryRepository: MemoryRepository);
    createMemory(inputMemory: any): Promise<Memory>;
    deleteMemory(id: string): Promise<boolean>;
    deleteMemoryByProduct(id: string): Promise<boolean>;
    deleteMemoryByProductAndName(id: string, name: string): Promise<boolean>;
    getOne(id: string): Promise<Memory>;
    getAll(): Promise<Memory[]>;
    findByProduct(id: string): Promise<Memory[]>;
    findByValue(name: string): Promise<Memory[]>;
    updateMemory(memoryId: string, memoryForUpdate: any, newImage: string): Promise<Memory>;
}
