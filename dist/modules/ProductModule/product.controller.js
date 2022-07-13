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
const sortheader_decorator_1 = require("../../decorators/sortheader.decorator");
const sort_enum_1 = require("../../enums/sort.enum");
const joivalidation_pipe_1 = require("../../validation/joivalidation.pipe");
const reviewFromUser_schema_1 = require("../../validation/schemas/reviewFromUser.schema");
const productforcreate_dto_1 = require("./dto/productforcreate.dto");
const reviewformuser_dto_1 = require("./dto/reviewformuser.dto");
const product_service_1 = require("./product.service");
const multer_1 = require("multer");
const imageFilter_helpers_1 = require("../../helpers/imageFilter.helpers");
const sortbyheader_decorator_1 = require("../../decorators/sortbyheader.decorator");
const charactValue_service_1 = require("../CharactValueModule/charactValue.service");
const color_service_1 = require("../ColorModule/color.service");
const memory_service_1 = require("../MemoryModule/memory.service");
const material_service_1 = require("../MaterialModule/material.service");
const information_service_1 = require("../InformationModule/information.service");
const swagger_1 = require("@nestjs/swagger");
let ProductController = class ProductController {
    constructor(productService, charactValueService, colorService, memoryService, materialService, informationService) {
        this.productService = productService;
        this.charactValueService = charactValueService;
        this.colorService = colorService;
        this.memoryService = memoryService;
        this.materialService = materialService;
        this.informationService = informationService;
    }
    async createProduct(productForCreate, file) {
        var _a;
        if (file != undefined)
            productForCreate.img_path =
                'http://194.62.19.52:7000/' + ((_a = file === null || file === void 0 ? void 0 : file.path) === null || _a === void 0 ? void 0 : _a.split('\\')[1]);
        const { in_stock, categoryId, characteristics, colors, materials, memory, information } = productForCreate, lprod = __rest(productForCreate, ["in_stock", "categoryId", "characteristics", "colors", "materials", "memory", "information"]);
        const prod = await this.productService.createProduct(Object.assign({ in_stock: parseInt(in_stock.toString()), categoryId: parseInt(categoryId.toString()) }, lprod));
        characteristics === null || characteristics === void 0 ? void 0 : characteristics.map((c) => {
            this.charactValueService.createCharactValue(Object.assign({ prodId: prod.id }, c));
        });
        colors === null || colors === void 0 ? void 0 : colors.map((c) => {
            this.colorService.createColor(Object.assign({ prodId: prod.id }, c));
        });
        materials === null || materials === void 0 ? void 0 : materials.map((c) => {
            this.materialService.createMaterial(Object.assign({ prodId: prod.id }, c));
        });
        memory === null || memory === void 0 ? void 0 : memory.map((c) => {
            this.memoryService.createMemory(Object.assign({ prodId: prod.id }, c));
        });
        information === null || information === void 0 ? void 0 : information.map((c) => {
            this.informationService.createInformation(Object.assign({ prodId: prod.id }, c));
        });
        return prod;
    }
    async getAllproducts(sort, sortby) {
        return await this.productService.getAll(sort, sortby);
    }
    async searchProductspost(sort, sortby, filters, name, text, min_price, max_price, producer) {
        if (name)
            filters.text = name;
        if (min_price)
            filters.min_price = min_price;
        if (max_price)
            filters.max_price = max_price;
        if (!sort)
            sort = sort_enum_1.Sort.asc;
        return await this.productService.findByFilters(filters, sort, sortby);
    }
    async searchProductss(sort, sortby, name, text, min_price, max_price, producer) {
        let filters = {};
        if (name)
            filters.text = name;
        if (min_price)
            filters.min_price = min_price;
        if (max_price)
            filters.max_price = max_price;
        if (!sort)
            sort = sort_enum_1.Sort.asc;
        return await this.productService.findByFilters(filters, sort, sortby);
    }
    async makeReviewForProduct(productId, currentUser, review) {
        return await this.productService.makeReview(currentUser.userId, currentUser.email, productId, review);
    }
    async updateProduct(productId, productForUpdate, file) {
        if (file != undefined)
            return await this.productService.updateProduct(productId, productForUpdate, 'http://194.62.19.52:7000/' + file.path.split('\\')[1]);
        else
            return await this.productService.updateProductWithoutImage(productId, productForUpdate);
    }
    async getProduct(id) {
        const prod = await this.productService.getOne(id);
        const characteristic = (await this.charactValueService.findByProductGroupbyValue(id)).map((i) => {
            if (i.characteristic.section != null)
                return {
                    name: i.characteristic.name,
                    value: i.value,
                    section: i.characteristic.section.value,
                };
            else
                return {
                    name: i.characteristic.name,
                    value: i.value,
                    section: 'Другое',
                };
        });
        const charact = characteristic.reduce((r, _a) => {
            var { section: name } = _a, object = __rest(_a, ["section"]);
            let temp = r.find((o) => o.name === name);
            if (!temp)
                r.push((temp = { name, children: [] }));
            temp.children.push(object);
            return r;
        }, []);
        const color = await this.colorService.findByProduct(prod.id);
        const colors = color.reduce((r, _a) => {
            var { color: name, color_code } = _a, object = __rest(_a, ["color", "color_code"]);
            let temp = r.find((o) => o.name === name);
            if (!temp)
                r.push((temp = { name, color_code, img_path: [] }));
            temp.img_path.push(object.img_path);
            return r;
        }, []);
        return {
            product: prod,
            characts: charact,
            colors: colors,
        };
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'добавить продукт' }),
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
    __metadata("design:paramtypes", [productforcreate_dto_1.ProductForCreate, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'получить все продукты' }),
    (0, common_1.Get)(),
    __param(0, (0, sortheader_decorator_1.Sorting)()),
    __param(1, (0, sortbyheader_decorator_1.SortingBy)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllproducts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'поиск продукта по фильтрам' }),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Query)('sort')),
    __param(1, (0, common_1.Query)('by')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Query)('name')),
    __param(4, (0, common_1.Query)('text')),
    __param(5, (0, common_1.Query)('minprice')),
    __param(6, (0, common_1.Query)('maxprice')),
    __param(7, (0, common_1.Query)('producer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "searchProductspost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'поиск продукта по фильтрам' }),
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('sort')),
    __param(1, (0, common_1.Query)('by')),
    __param(2, (0, common_1.Query)('name')),
    __param(3, (0, common_1.Query)('text')),
    __param(4, (0, common_1.Query)('minprice')),
    __param(5, (0, common_1.Query)('maxprice')),
    __param(6, (0, common_1.Query)('producer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "searchProductss", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'оставить отзыв на продукт по id' }),
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
    (0, swagger_1.ApiOperation)({ summary: 'изменить продукт по id' }),
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
    (0, swagger_1.ApiOperation)({ summary: 'получить продукт по id' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        charactValue_service_1.CharactValueService,
        color_service_1.ColorService,
        memory_service_1.MemoryService,
        material_service_1.MaterialService,
        information_service_1.InformationService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map