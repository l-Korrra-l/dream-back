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
exports.DiscountSeasonService = void 0;
const common_1 = require("@nestjs/common");
const discountSeason_repository_1 = require("../../persistance/repository/discountSeason.repository");
let DiscountSeasonService = class DiscountSeasonService {
    constructor(discountseasonRepository) {
        this.discountseasonRepository = discountseasonRepository;
    }
    async createDiscountSeason(inputDiscountSeason) {
        return await this.discountseasonRepository.create(inputDiscountSeason);
    }
    async deleteDiscountSeason(id) {
        return await this.discountseasonRepository.delete(id);
    }
    async deleteDiscountSeasonByName(name) {
        return await this.discountseasonRepository.deleteByName(name);
    }
    async getOne(id) {
        return await this.discountseasonRepository.findOne(id);
    }
    async getAll() {
        return await this.discountseasonRepository.findAll();
    }
    async findByName(name) {
        return await this.discountseasonRepository.findByName(name);
    }
    async updateDiscountSeason(discountseasonId, discountseasonForUpdate) {
        return await this.discountseasonRepository.update(discountseasonId, discountseasonForUpdate);
    }
};
DiscountSeasonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [discountSeason_repository_1.DiscountSeasonRepository])
], DiscountSeasonService);
exports.DiscountSeasonService = DiscountSeasonService;
//# sourceMappingURL=discountSeason.service.js.map