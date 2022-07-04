import { Category } from '@prisma/client';
import { CategoryRepository } from 'src/persistance/repository/category.repository';
import { CategoryForCreate } from './dto/categoryforcreate.dto';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    createCategory(inputCategory: CategoryForCreate): Promise<Category>;
    getOne(id: string): Promise<Category>;
    getAll(): Promise<Category[]>;
    delete(id: string): Promise<boolean>;
    updateCategory(id: string, categoryForUpdate: CategoryForCreate): Promise<Category>;
}
