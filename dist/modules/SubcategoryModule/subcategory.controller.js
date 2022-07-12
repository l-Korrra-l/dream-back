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
exports.SubcategoryController = void 0;
const common_1 = require("@nestjs/common");
const subcategory_service_1 = require("./subcategory.service");
const subcategoryforcreate_dto_1 = require("./dto/subcategoryforcreate.dto");
const swagger_1 = require("@nestjs/swagger");
let SubcategoryController = class SubcategoryController {
    constructor(subcategoryService) {
        this.subcategoryService = subcategoryService;
    }
    async createSubcategory(subcategoryForCreate) {
        return await this.subcategoryService.createSubcategory(subcategoryForCreate);
    }
    async getProduct(id) {
        return await this.subcategoryService.getOne(id);
    }
    async getAllproducts() {
        return await this.subcategoryService.getAll();
    }
    async deleteProduct(id) {
        return await this.subcategoryService.delete(id);
    }
    async updateSubcategory(subcategoryForCreate, id) {
        return await this.subcategoryService.updateSubcategory(id, subcategoryForCreate);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subcategoryforcreate_dto_1.SubcategoryForCreate]),
    __metadata("design:returntype", Promise)
], SubcategoryController.prototype, "createSubcategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'get product by id' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubcategoryController.prototype, "getProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'get all products' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubcategoryController.prototype, "getAllproducts", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubcategoryController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subcategoryforcreate_dto_1.SubcategoryForCreate, String]),
    __metadata("design:returntype", Promise)
], SubcategoryController.prototype, "updateSubcategory", null);
SubcategoryController = __decorate([
    (0, common_1.Controller)('subcategory'),
    __metadata("design:paramtypes", [subcategory_service_1.SubcategoryService])
], SubcategoryController);
exports.SubcategoryController = SubcategoryController;
//# sourceMappingURL=subcategory.controller.js.map