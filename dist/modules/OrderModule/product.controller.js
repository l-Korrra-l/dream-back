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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const currentuser_decorator_1 = require("../../decorators/currentuser.decorator");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const sortheader_decorator_1 = require("../../decorators/sortheader.decorator");
const role_enum_1 = require("../../enums/role.enum");
const sort_enum_1 = require("../../enums/sort.enum");
const joivalidation_pipe_1 = require("../../validation/joivalidation.pipe");
const reviewFromUser_schema_1 = require("../../validation/schemas/reviewFromUser.schema");
const jwt_guard_1 = require("../AuthModule/guards/jwt.guard");
const roles_guard_1 = require("../AuthModule/guards/roles.guard");
const productforcreate_dto_1 = require("./dto/productforcreate.dto");
const productforupdate_dto_1 = require("./dto/productforupdate.dto");
const reviewformuser_dto_1 = require("./dto/reviewformuser.dto");
const product_service_1 = require("./product.service");
const multer_1 = require("multer");
const imageFilter_helpers_1 = require("../../helpers/imageFilter.helpers");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async createProduct(productForCreate, file) {
        productForCreate.img_path =
            file.path.split('\\')[1];
        return await this.productService.createProduct(productForCreate);
    }
    async getProduct(id) {
        return await this.productService.getOne(id);
    }
    async getAllproducts(sort) {
        return await this.productService.getAll(sort);
    }
    async searchProducts(valueForSearch) {
        const name = valueForSearch;
        const author = valueForSearch;
        return await this.productService.findByValue(name, author);
    }
    async makeReviewForProduct(productId, currentUser, review) {
        return await this.productService.makeReview(currentUser.userId, currentUser.email, productId, review);
    }
    async updateProduct(productId, productForUpdate, file) {
        return await this.productService.updateProduct(productId, productForUpdate, file.path.split('\\')[1] + '.' + file.originalname.split('.')[1]);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: 'public',
        }),
        fileFilter: imageFilter_helpers_1.imageFileFilter,
    })),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof productforcreate_dto_1.ProductForCreate !== "undefined" && productforcreate_dto_1.ProductForCreate) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, sortheader_decorator_1.Sorting)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllproducts", null);
__decorate([
    (0, common_1.Get)('search/:value'),
    __param(0, (0, common_1.Param)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "searchProducts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('makereview/:productId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, currentuser_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)(new joivalidation_pipe_1.JoiValidationPipe(reviewFromUser_schema_1.reviewFromUserSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, typeof (_b = typeof reviewformuser_dto_1.ReviewFromUser !== "undefined" && reviewformuser_dto_1.ReviewFromUser) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "makeReviewForProduct", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: 'public',
        }),
        fileFilter: imageFilter_helpers_1.imageFileFilter,
    })),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof productforupdate_dto_1.ProductForUpdate !== "undefined" && productforupdate_dto_1.ProductForUpdate) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [typeof (_d = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _d : Object])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map