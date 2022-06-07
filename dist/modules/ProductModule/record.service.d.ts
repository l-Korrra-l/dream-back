/// <reference types="multer" />
import { ProductForCreate } from './dto/productforcreate.dto';
import { Product } from '@prisma/client';
import { ProductRepository } from 'src/persistance/repository/product.repository';
import { ImageService } from '../ImageModule/image.service';
import { Sort } from 'src/enums/sort.enum';
import { ReviewFromUser } from './dto/reviewformuser.dto';
import { ReviewRepository } from 'src/persistance/repository/review.repository';
import { ProductForUpdate } from './dto/productforupdate.dto';
export declare class ProductService {
    private productRepository;
    private imageService;
    private reviewRepository;
    constructor(productRepository: ProductRepository, imageService: ImageService, reviewRepository: ReviewRepository);
    createProduct(inputProduct: ProductForCreate): Promise<Product>;
    getOne(id: string): Promise<Product>;
    getAll(sort: Sort): Promise<Product[]>;
    findByValue(name: string, author: string): Promise<Product[]>;
    makeReview(userId: string, author: string, productId: string, review: ReviewFromUser): Promise<import(".prisma/client").Review>;
    updateProduct(productId: string, productForUpdate: ProductForUpdate, newImage: Express.Multer.File): Promise<Product>;
}
