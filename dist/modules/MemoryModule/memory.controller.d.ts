/// <reference types="multer" />
import { MemoryService } from './memory.service';
export declare class MemoryController {
    private memoryService;
    constructor(memoryService: MemoryService);
    createMemory(memoryForCreate: any, file: Express.Multer.File): Promise<import(".prisma/client").Memory>;
    updateMemory(memoryId: string, memoryForUpdate: any, file: any): Promise<import(".prisma/client").Memory>;
    getAllmemorys(prod: string): Promise<import(".prisma/client").Memory[]>;
    getMemory(id: string): Promise<import(".prisma/client").Memory>;
    deleteMemoryByProductAndName(prod: string, name: string): Promise<boolean>;
    deleteMemory(id: string): Promise<boolean>;
}
