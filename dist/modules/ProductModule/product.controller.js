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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const uuid_1 = require("uuid");
const path_1 = require("path");
const currentuser_decorator_1 = require("../../decorators/currentuser.decorator");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const sortheader_decorator_1 = require("../../decorators/sortheader.decorator");
const role_enum_1 = require("../../enums/role.enum");
const sort_enum_1 = require("../../enums/sort.enum");
const joivalidation_pipe_1 = require("../../validation/joivalidation.pipe");
const reviewFromUser_schema_1 = require("../../validation/schemas/reviewFromUser.schema");
const jwt_guard_1 = require("../AuthModule/guards/jwt.guard");
const roles_guard_1 = require("../AuthModule/guards/roles.guard");
const reviewformuser_dto_1 = require("./dto/reviewformuser.dto");
const product_service_1 = require("./product.service");
const multer_1 = require("multer");
const imageFilter_helpers_1 = require("../../helpers/imageFilter.helpers");
const sortbyheader_decorator_1 = require("../../decorators/sortbyheader.decorator");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async createProduct(productForCreate, file) {
        productForCreate.img_path = file.path.split('\\')[1];
        console.log(productForCreate.in_stock);
        const { in_stock, categoryId } = productForCreate, lprod = __rest(productForCreate, ["in_stock", "categoryId"]);
        return await this.productService.createProduct(Object.assign({ in_stock: parseInt(in_stock.toString()), categoryId: parseInt(categoryId.toString()) }, lprod));
    }
    async getAllproducts(sort, sortby) {
        return await this.productService.getAll(sort, sortby);
    }
    async searchProductss(sort, sortby, filters) {
        return await this.productService.findByFilters(filters, sort, sortby);
    }
    async makeReviewForProduct(productId, currentUser, review) {
        return await this.productService.makeReview(currentUser.userId, currentUser.email, productId, review);
    }
    async updateProduct(productId, productForUpdate, file) {
        return await this.productService.updateProduct(productId, productForUpdate, file.path.split('\\')[1] + '.' + file.originalname.split('.')[1]);
    }
    async getProduct(id) {
        return await this.productService.getOne(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: 'public',
            filename: (req, file, cb) => {
                cb(null, `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: imageFilter_helpers_1.imageFileFilter,
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, sortheader_decorator_1.Sorting)()),
    __param(1, (0, sortbyheader_decorator_1.SortingBy)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllproducts", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, sortheader_decorator_1.Sorting)()),
    __param(1, (0, sortbyheader_decorator_1.SortingBy)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "searchProductss", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('makereview/:productId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, currentuser_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)(new joivalidation_pipe_1.JoiValidationPipe(reviewFromUser_schema_1.reviewFromUserSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, reviewformuser_dto_1.ReviewFromUser]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "makeReviewForProduct", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: 'public',
            filename: (req, file, cb) => {
                cb(null, `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: imageFilter_helpers_1.imageFileFilter,
    })),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map