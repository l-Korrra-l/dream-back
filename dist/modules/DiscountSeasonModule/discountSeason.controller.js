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
exports.DiscountSeasonController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../AuthModule/guards/jwt.guard");
const roles_guard_1 = require("../AuthModule/guards/roles.guard");
const discountSeason_service_1 = require("./discountSeason.service");
let DiscountSeasonController = class DiscountSeasonController {
    constructor(discountseasonService) {
        this.discountseasonService = discountseasonService;
    }
    async createDiscountSeason(discountseasonForCreate) {
        return await this.discountseasonService.createDiscountSeason(discountseasonForCreate);
    }
    async updateDiscountSeason(discountseasonId, discountseasonForUpdate) {
        return await this.discountseasonService.updateDiscountSeason(discountseasonId, discountseasonForUpdate);
    }
    async getAlldiscountseasons(name) {
        if (name != '' && name != undefined && name != null)
            return await this.discountseasonService.findByName(name);
        return await this.discountseasonService.getAll();
    }
    async getDiscountSeason(id) {
        return await this.discountseasonService.getOne(id);
    }
    async deleteDiscountSeasonByName(name) {
        if (name != null && name != undefined)
            return await this.discountseasonService.deleteDiscountSeasonByName(name);
    }
    async deleteDiscountSeason(id) {
        return await this.discountseasonService.deleteDiscountSeason(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DiscountSeasonController.prototype, "createDiscountSeason", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DiscountSeasonController.prototype, "updateDiscountSeason", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiscountSeasonController.prototype, "getAlldiscountseasons", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiscountSeasonController.prototype, "getDiscountSeason", null);
__decorate([
    (0, common_1.Delete)('/'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiscountSeasonController.prototype, "deleteDiscountSeasonByName", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiscountSeasonController.prototype, "deleteDiscountSeason", null);
DiscountSeasonController = __decorate([
    (0, common_1.Controller)('discountseason'),
    __metadata("design:paramtypes", [discountSeason_service_1.DiscountSeasonService])
], DiscountSeasonController);
exports.DiscountSeasonController = DiscountSeasonController;
//# sourceMappingURL=discountSeason.controller.js.map