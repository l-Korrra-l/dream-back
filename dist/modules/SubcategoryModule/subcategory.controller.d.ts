import { SubcategoryService } from './subcategory.service';
import { SubcategoryForCreate } from './dto/subcategoryforcreate.dto';
export declare class SubcategoryController {
    private subcategoryService;
    constructor(subcategoryService: SubcategoryService);
    createSubcategory(subcategoryForCreate: SubcategoryForCreate): Promise<import(".prisma/client").Subcategory>;
    getProduct(id: string): Promise<import(".prisma/client").Subcategory>;
    getAllproducts(): Promise<import(".prisma/client").Subcategory[]>;
    deleteProduct(id: string): Promise<boolean>;
    updateSubcategory(subcategoryForCreate: SubcategoryForCreate, id: string): Promise<import(".prisma/client").Subcategory>;
}
