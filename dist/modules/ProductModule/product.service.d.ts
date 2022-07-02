import { Product } from '@prisma/client';
import { ProductRepository } from 'src/persistance/repository/product.repository';
import { Sort } from 'src/enums/sort.enum';
import { ReviewFromUser } from './dto/reviewformuser.dto';
import { ReviewRepository } from 'src/persistance/repository/review.repository';
import { ProductForUpdate } from './dto/productforupdate.dto';
import { CategoryRepository } from 'src/persistance/repository/category.repository';
import { CharactValueRepository } from 'src/persistance/repository/charactValue.repository';
export declare class ProductService {
    private productRepository;
    private reviewRepository;
    private categoryRepository;
    private caractValueRepository;
    constructor(productRepository: ProductRepository, reviewRepository: ReviewRepository, categoryRepository: CategoryRepository, caractValueRepository: CharactValueRepository);
    createProduct(inputProduct: any): Promise<Product>;
    getOne(id: string): Promise<Product>;
    getAll(sort: Sort, sortby: string): Promise<Product[]>;
    findByValue(name: string, author: string): Promise<Product[]>;
    findByFilters(filters: any, sort: Sort, sortby: string): Promise<Product[]>;
    makeReview(userId: string, author: string, productId: string, review: ReviewFromUser): Promise<import(".prisma/client").Review>;
    updateProduct(productId: string, productForUpdate: ProductForUpdate, newImage: string): Promise<Product>;
    updateProductWithoutImage(productId: string, productForUpdate: ProductForUpdate): Promise<Product>;
}
