import { CategoryService } from './category.service';
import { CategoryForCreate } from './dto/categoryforcreate.dto';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    createCategory(categoryForCreate: CategoryForCreate, file: any): Promise<import(".prisma/client").Category>;
    getProduct(id: string): Promise<import(".prisma/client").Category>;
    getAllproducts(): Promise<import(".prisma/client").Category[]>;
    deleteProduct(id: string): Promise<boolean>;
    updateCategory(categoryForCreate: CategoryForCreate, file: any, id: string): Promise<import(".prisma/client").Category>;
}
