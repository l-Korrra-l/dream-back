"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("../../persistance/repository/product.repository");
const review_repository_1 = require("../../persistance/repository/review.repository");
let ProductService = class ProductService {
    constructor(productRepository, reviewRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
    }
    async createProduct(inputProduct) {
        const product = await this.productRepository.create(Object.assign({ raiting: 0 }, inputProduct));
        return product;
    }
    async getOne(id) {
        return await this.productRepository.findOne(id);
    }
    async getAll(sort) {
        return await this.productRepository.findAllWithSorting(sort);
    }
    async findByValue(name, author) {
        return await this.productRepository.findByValue(name, author);
    }
    async makeReview(userId, author, productId, review) {
        const product = await this.productRepository.findWithReviews(productId);
        if (product.reviews.find((rec) => rec.userId == Number(userId))) {
            throw new common_1.ForbiddenException('Review for this product already exists');
        }
        const productStats = await this.reviewRepository.getStatsOfProduct(productId);
        const newRaiting = ((productStats.sum + review.raiting) /
            (productStats.count + 1)).toFixed(1);
        await this.productRepository.update(productId, {
            raiting: parseFloat(newRaiting),
        });
        return await this.reviewRepository.create(Object.assign({ prodId: productId, userId: userId, authorName: author, productName: product.name, createdDate: new Date() }, review));
    }
    async updateProduct(productId, productForUpdate, newImage) {
        const product = await this.productRepository.findOne(productId);
        productForUpdate.img_path = newImage;
        return await this.productRepository.update(productId, productForUpdate);
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        review_repository_1.ReviewRepository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map