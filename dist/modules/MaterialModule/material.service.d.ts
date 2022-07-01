import { Material } from '@prisma/client';
import { MaterialRepository } from 'src/persistance/repository/material.repository';
export declare class MaterialService {
    private materialRepository;
    constructor(materialRepository: MaterialRepository);
    createMaterial(inputMaterial: any): Promise<Material>;
    deleteMaterial(id: string): Promise<boolean>;
    deleteMaterialByProduct(id: string): Promise<boolean>;
    deleteMaterialByProductAndName(id: string, name: string): Promise<boolean>;
    getOne(id: string): Promise<Material>;
    getAll(): Promise<Material[]>;
    findByProduct(id: string): Promise<Material[]>;
    findByValue(name: string): Promise<Material[]>;
    updateMaterial(materialId: string, materialForUpdate: any, newImage: string): Promise<Material>;
}
