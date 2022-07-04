/// <reference types="multer" />
import { MaterialService } from './material.service';
import { MaterialForCreate } from './dto/materailforcreate.dto';
export declare class MaterialController {
    private materialService;
    constructor(materialService: MaterialService);
    createMaterial(materialForCreate: MaterialForCreate, file: Express.Multer.File): Promise<import(".prisma/client").Material>;
    updateMaterial(materialId: string, materialForUpdate: any, file: any): Promise<import(".prisma/client").Material>;
    getAllmaterials(prod: string): Promise<import(".prisma/client").Material[]>;
    getMaterial(id: string): Promise<import(".prisma/client").Material>;
    deleteMaterialByProductAndName(prod: string, name: string): Promise<boolean>;
    deleteMaterial(id: string): Promise<boolean>;
}
