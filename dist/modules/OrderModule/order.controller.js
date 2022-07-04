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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const currentuser_decorator_1 = require("../../decorators/currentuser.decorator");
const order_service_1 = require("./order.service");
const OrderForCreate_1 = require("./dto/OrderForCreate");
const swagger_1 = require("@nestjs/swagger");
const email_service_1 = require("../EmailModule/email.service");
let OrderController = class OrderController {
    constructor(orderService, emailservice) {
        this.orderService = orderService;
        this.emailservice = emailservice;
    }
    async createProduct(user, orderForCreate) {
        this.emailservice.sendMail({
            to: user.email,
            subject: 'Dreamstore заказ',
            text: 'Ваш заказ оформлен',
        });
        return await this.orderService.createOrder(orderForCreate, user.userId);
    }
    async getOrder(id) {
        return await this.orderService.getOne(id);
    }
    async getAllproducts(user) {
        return await this.orderService.getAll(user);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'добавление заказа массив корзин {buckets: {prodid:, quantity:}}',
    }),
    __param(0, (0, currentuser_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, OrderForCreate_1.OrderForCreate]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'получить заказ по id' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'все заказы текущего пользователя, либо все для неавторизованного/админа',
    }),
    __param(0, (0, currentuser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllproducts", null);
OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        email_service_1.default])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map