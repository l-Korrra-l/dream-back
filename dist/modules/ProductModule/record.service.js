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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("../../persistance/repository/product.repository");
const review_repository_1 = require("../../persistance/repository/review.repository");
let ProductService = class ProductService {
    constructor(productRepository, imageService, reviewRepository) {
        this.productRepository = productRepository;
        this.imageService = imageService;
        this.reviewRepository = reviewRepository;
    }
    async createProduct(inputProduct) {
        const { image } = inputProduct, productForCreate = __rest(inputProduct, ["image"]);
        const savedImage = await this.imageService.createImage(image);
        const product = await this.productRepository.create(Object.assign({ imageUrl: savedImage.imageUrl, imageId: savedImage.imageId, raiting: 0 }, productForCreate));
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
        if (product.review.find((rec) => rec.userId == userId)) {
            throw new common_1.ForbiddenException('Review for this product already exists');
        }
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const date = `${today.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? day + '0' : day}`;
        const productStats = await this.reviewRepository.getStatsOfProduct(productId);
        const newRaiting = ((productStats.sum + review.raiting) /
            (productStats.count + 1)).toFixed(1);
        await this.productRepository.update(productId, {
            raiting: parseFloat(newRaiting),
        });
        return await this.reviewRepository.create(Object.assign({ productId: productId, userId: userId, authorName: author, productName: product.name, createdDate: date }, review));
    }
    async updateProduct(productId, productForUpdate, newImage) {
        const product = await this.productRepository.findOne(productId);
        if (newImage) {
            this.imageService.validateImage(newImage);
            await this.imageService.updateImage(product.imageId, newImage);
        }
        return await this.productRepository.update(productId, productForUpdate);
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository, typeof (_a = typeof ImageService !== "undefined" && ImageService) === "function" ? _a : Object, review_repository_1.ReviewRepository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=record.service.js.map