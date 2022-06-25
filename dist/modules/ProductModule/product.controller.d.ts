/// <reference types="multer" />
import { Sort } from 'src/enums/sort.enum';
import { CurrentUserInfo } from 'src/types/types';
import { ReviewFromUser } from './dto/reviewformuser.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    createProduct(productForCreate: any, file: Express.Multer.File): Promise<Product>;
    getAllproducts(sort: Sort, sortby: string): Promise<Product[]>;
    searchProductss(sort: Sort, sortby: string, filters: any): Promise<Product[]>;
    makeReviewForProduct(productId: any, currentUser: CurrentUserInfo, review: ReviewFromUser): Promise<Review>;
    updateProduct(productId: string, productForUpdate: any, file: any): Promise<Product>;
    getProduct(id: string): Promise<Product>;
}
