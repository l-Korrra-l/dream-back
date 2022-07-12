import { Subcategory } from '@prisma/client';
import { SubcategoryRepository } from 'src/persistance/repository/subcategory.repository';
import { SubcategoryForCreate } from './dto/subcategoryforcreate.dto';
export declare class SubcategoryService {
    private subcategoryRepository;
    constructor(subcategoryRepository: SubcategoryRepository);
    createSubcategory(inputSubcategory: SubcategoryForCreate): Promise<Subcategory>;
    getOne(id: string): Promise<Subcategory>;
    getAll(): Promise<Subcategory[]>;
    delete(id: string): Promise<boolean>;
    updateSubcategory(id: string, subcategoryForUpdate: SubcategoryForCreate): Promise<Subcategory>;
}
