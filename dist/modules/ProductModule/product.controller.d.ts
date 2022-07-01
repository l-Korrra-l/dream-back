/// <reference types="multer" />
import { Sort } from 'src/enums/sort.enum';
import { CurrentUserInfo } from 'src/types/types';
import { ReviewFromUser } from './dto/reviewformuser.dto';
import { ProductService } from './product.service';
import { CharactValueService } from '../CharactValueModule/charactValue.service';
export declare class ProductController {
    private productService;
    private charactValueService;
    constructor(productService: ProductService, charactValueService: CharactValueService);
    createProduct(productForCreate: any, file: Express.Multer.File): Promise<{
        prod: import(".prisma/client").Product;
        characts: import(".prisma/client").CharactValue[];
    }>;
    getAllproducts(sort: Sort, sortby: string): Promise<import(".prisma/client").Product[]>;
    searchProductss(sort: Sort, sortby: string, filters: any): Promise<import(".prisma/client").Product[]>;
    makeReviewForProduct(productId: any, currentUser: CurrentUserInfo, review: ReviewFromUser): Promise<import(".prisma/client").Review>;
    updateProduct(productId: string, productForUpdate: any, file: any): Promise<import(".prisma/client").Product>;
    getProduct(id: string): Promise<import(".prisma/client").Product>;
}
