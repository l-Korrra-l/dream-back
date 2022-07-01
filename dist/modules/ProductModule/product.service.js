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
const category_repository_1 = require("../../persistance/repository/category.repository");
const charactvalue_repository_1 = require("src/persistance/repository/charactvalue.repository");
let ProductService = class ProductService {
    constructor(productRepository, reviewRepository, categoryRepository, caractValueRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.categoryRepository = categoryRepository;
        this.caractValueRepository = caractValueRepository;
    }
    async createProduct(inputProduct) {
        const cat = await this.categoryRepository.findOne(inputProduct.categoryId.toString());
        const { categoryId } = inputProduct, lProduct = __rest(inputProduct, ["categoryId"]);
        const product = await this.productRepository.create(Object.assign({ raiting: 0, categoryId: categoryId }, inputProduct));
        const characteristic = await this.caractValueRepository.findByProduct(product.id.toString());
        return product;
    }
    async getOne(id) {
        return await this.productRepository.findOne(id);
    }
    async getAll(sort, sortby) {
        return await this.productRepository.findAllWithSorting(sort, sortby);
    }
    async findByValue(name, author) {
        return await this.productRepository.findByValue(name, author);
    }
    async findByFilters(filters, sort, sortby) {
        let arr;
        if (filters.name != null && filters.name != undefined)
            arr = await this.productRepository.findByName(filters.name, sort);
        else if (filters.text != null && filters.text != undefined)
            arr = await this.productRepository.findByText(filters.text, sort);
        else if (filters.producer != null && filters.producer != undefined)
            return await this.productRepository.findByProducer(filters.producer, sort, sortby);
        if (!filters.min_price)
            filters.min_price = -1;
        if (!filters.max_price)
            filters.max_price = Number.MAX_VALUE / 2;
        if (filters.producer != null && filters.producer != undefined)
            arr.map((i) => {
                if (i.producer.includes(filters.producer))
                    return i;
            });
        return arr.map((i) => {
            if (i.price > filters.min_price && i.price < filters.max_price)
                return i;
        });
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
        review_repository_1.ReviewRepository,
        category_repository_1.CategoryRepository, typeof (_a = typeof charactvalue_repository_1.CharactValueRepository !== "undefined" && charactvalue_repository_1.CharactValueRepository) === "function" ? _a : Object])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map