import { CategoryService } from './category.service';
import { CategoryForCreate } from './dto/categoryforcreate.dto';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    createCategory(categoryForCreate: CategoryForCreate, file: any): Promise<Category>;
    getProduct(id: string): Promise<Category>;
    getAllproducts(): Promise<Category[]>;
    deleteProduct(id: string): Promise<boolean>;
    updateCategory(categoryForCreate: CategoryForCreate, file: any, id: string): Promise<Category>;
}
