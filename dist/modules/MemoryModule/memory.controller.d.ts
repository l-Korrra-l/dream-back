import { MemoryService } from './memory.service';
import { MemoryForCreate } from './dto/memoryforcreate.dto';
export declare class MemoryController {
    private memoryService;
    constructor(memoryService: MemoryService);
    createMemory(memoryForCreate: MemoryForCreate): Promise<import(".prisma/client").Memory>;
    updateMemory(memoryId: string, memoryForUpdate: any): Promise<import(".prisma/client").Memory>;
    getAllmemorys(prod: string): Promise<import(".prisma/client").Memory[]>;
    getMemory(id: string): Promise<import(".prisma/client").Memory>;
    deleteMemoryByProductAndName(prod: string, name: string): Promise<boolean>;
    deleteMemory(id: string): Promise<boolean>;
}
