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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("../../persistance/repository/product.repository");
const bucket_repository_1 = require("../../persistance/repository/bucket.repository");
let OrderService = class OrderService {
    constructor(orderRepository, bucketRepository) {
        this.orderRepository = orderRepository;
        this.bucketRepository = bucketRepository;
    }
    async createOrder(inputProduct) {
        const product = await this.orderRepository.create(Object.assign({ raiting: 0 }, inputProduct));
        return product;
    }
    async getOne(id) {
        return await this.orderRepository.findOne(id);
    }
    async getAll() {
        return await this.orderRepository.findAll();
    }
    async findByValue(name, author) {
        return await this.orderRepository.findByValue(name, author);
    }
    async updateOrder() {
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof product_repository_1.OrderRepository !== "undefined" && product_repository_1.OrderRepository) === "function" ? _a : Object, bucket_repository_1.BucketRepository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=product.service.js.map