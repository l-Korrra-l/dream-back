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
exports.CurrencyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../AuthModule/guards/jwt.guard");
const roles_guard_1 = require("../AuthModule/guards/roles.guard");
const currency_service_1 = require("./currency.service");
let CurrencyController = class CurrencyController {
    constructor(currencyService) {
        this.currencyService = currencyService;
    }
    async createCurrency(rate) {
        return await this.currencyService.createCurrency(rate.rate);
    }
    async updateCurrency(rate) {
        return await this.currencyService.createCurrency(rate);
    }
    async getCurrency() {
        return await this.currencyService.getOne();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'добавить курс валюты',
    }),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
<<<<<<< HEAD
=======
    (0, swagger_1.ApiBearerAuth)('access-token'),
>>>>>>> 376e95b7e43aca62c19acf6875d918e5ba556cad
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "createCurrency", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'изменить курс валюты',
    }),
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
<<<<<<< HEAD
=======
    (0, swagger_1.ApiBearerAuth)('access-token'),
>>>>>>> 376e95b7e43aca62c19acf6875d918e5ba556cad
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "updateCurrency", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'получить курс валюты',
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "getCurrency", null);
CurrencyController = __decorate([
    (0, common_1.Controller)('currency'),
    __metadata("design:paramtypes", [currency_service_1.CurrencyService])
], CurrencyController);
exports.CurrencyController = CurrencyController;
//# sourceMappingURL=currency.controller.js.map