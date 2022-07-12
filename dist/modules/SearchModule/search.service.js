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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const bucket_repository_1 = require("../../persistance/repository/bucket.repository");
const order_repository_1 = require("../../persistance/repository/order.repository");
const product_repository_1 = require("../../persistance/repository/product.repository");
const review_repository_1 = require("../../persistance/repository/review.repository");
const user_repository_1 = require("../../persistance/repository/user.repository");
let SearchService = class SearchService {
    constructor(userRepository, productRepository, orderRepository, reviewRepository, bucketRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.reviewRepository = reviewRepository;
        this.bucketRepository = bucketRepository;
    }
};
SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        product_repository_1.ProductRepository,
        order_repository_1.OrderRepository,
        review_repository_1.ReviewRepository,
        bucket_repository_1.BucketRepository])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map