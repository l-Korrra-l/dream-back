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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const order_repository_1 = require("../../persistance/repository/order.repository");
const bucket_repository_1 = require("../../persistance/repository/bucket.repository");
const user_repository_1 = require("../../persistance/repository/user.repository");
const product_repository_1 = require("../../persistance/repository/product.repository");
const role_enum_1 = require("../../enums/role.enum");
let OrderService = class OrderService {
    constructor(orderRepository, bucketRepository, userRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.bucketRepository = bucketRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }
    async createOrder(inputOrder, userId) {
        let user;
        if (userId) {
            user = await this.userRepository.getById(userId);
            if (user.phoneNumber == null ||
                user.phoneNumber == undefined ||
                user.phoneNumber == '')
                user = await this.userRepository.update(userId, {
                    phoneNumber: inputOrder.phoneNumber,
                });
        }
        else
            user = await this.userRepository.create({
                firstName: inputOrder.firstName,
                lastName: inputOrder.lastname,
                role: role_enum_1.Role.Guest,
                phoneNumber: inputOrder.phoneNumber,
            });
        let newOrder = await this.orderRepository.create({
            date: new Date(),
            user: user,
            status: '��������',
        });
        let cost = 0;
        inputOrder.cartItems.forEach(async (buck) => {
            let prod = await this.productRepository.getById(buck.prodId);
            prod = await this.productRepository.update(buck.prodId.toString(), {
                in_stock: prod.in_stock - buck.quantity,
            });
            await this.bucketRepository.create({
                order: newOrder,
                product: prod,
                quantity: buck.quantity,
            });
            cost += Number(prod.price) * buck.quantity;
        });
        newOrder = await this.orderRepository.updateNumId(newOrder.id, {
            totalCost: cost,
        });
        return newOrder;
    }
    async getOne(id) {
        return await this.orderRepository.findOne(id);
    }
    async getAll(user) {
        if (user.role == role_enum_1.Role.User)
            return await this.orderRepository.findByUser(user.userId);
        else
            return await this.orderRepository.findAll();
    }
    async updateOrder() {
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [order_repository_1.OrderRepository,
        bucket_repository_1.BucketRepository,
        user_repository_1.UserRepository,
        product_repository_1.ProductRepository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map