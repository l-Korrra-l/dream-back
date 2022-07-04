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
exports.DiscountService = void 0;
const common_1 = require("@nestjs/common");
const discount_repository_1 = require("../../persistance/repository/discount.repository");
let DiscountService = class DiscountService {
    constructor(discountRepository) {
        this.discountRepository = discountRepository;
    }
    async createDiscount(inputDiscount) {
        return await this.discountRepository.create(inputDiscount);
    }
    async deleteDiscount(id) {
        return await this.discountRepository.delete(id);
    }
    async deleteDiscountByProduct(id) {
        return await this.discountRepository.deleteByProduct(id);
    }
    async getOne(id) {
        return await this.discountRepository.findOne(id);
    }
    async getAll() {
        return await this.discountRepository.findAll();
    }
    async findByProduct(id) {
        return await this.discountRepository.findByProduct(id);
    }
    async updateDiscount(discountId, discountForUpdate) {
        return await this.discountRepository.update(discountId, discountForUpdate);
    }
};
DiscountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [discount_repository_1.DiscountRepository])
], DiscountService);
exports.DiscountService = DiscountService;
//# sourceMappingURL=discount.service.js.map