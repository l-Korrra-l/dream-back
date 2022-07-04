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
const roles_decorator_1 = require("../../decorators/roles.decorator");
const role_enum_1 = require("../../enums/role.enum");
const jwt_guard_1 = require("../AuthModule/guards/jwt.guard");
const roles_guard_1 = require("../AuthModule/guards/roles.guard");
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
        console.log(user);
        return await this.orderService.createOrder(orderForCreate, user.userId);
    }
    async getOrder(id) {
        return await this.orderService.getOne(id);
    }
    async getAllproducts(user) {
        const order = await this.orderService.getAll(user);
        this.emailservice.sendMail({
            to: user.email,
            subject: 'Dreamstore �����',
            text: '��� ����� ��������',
        });
        return order;
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.User),
    (0, swagger_1.ApiOperation)({ summary: ' add array of {buckets: {prodid:, quantity:}}' }),
    __param(0, (0, currentuser_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, OrderForCreate_1.OrderForCreate]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'get order by id' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Get)(),
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