import { Sort } from 'src/enums/sort.enum';
import { CurrentUserInfo } from 'src/types/types';
import { ProductForCreate } from './dto/productforcreate.dto';
import { ProductForUpdate } from './dto/productforupdate.dto';
import { ReviewFromUser } from './dto/reviewformuser.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    createProduct(productForCreate: ProductForCreate, file: any): Promise<any>;
    getProduct(id: string): Promise<any>;
    getAllproducts(sort: Sort): Promise<any>;
    searchProducts(valueForSearch: string): Promise<any>;
    makeReviewForProduct(productId: any, currentUser: CurrentUserInfo, review: ReviewFromUser): Promise<any>;
    updateProduct(productId: string, productForUpdate: ProductForUpdate, file: any): Promise<any>;
}
