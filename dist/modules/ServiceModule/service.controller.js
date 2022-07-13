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
exports.ServiceController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const uuid_1 = require("uuid");
const path_1 = require("path");
const currentuser_decorator_1 = require("../../decorators/currentuser.decorator");
const sortheader_decorator_1 = require("../../decorators/sortheader.decorator");
const sort_enum_1 = require("../../enums/sort.enum");
const joivalidation_pipe_1 = require("../../validation/joivalidation.pipe");
const reviewFromUser_schema_1 = require("../../validation/schemas/reviewFromUser.schema");
const reviewformuser_dto_1 = require("./dto/reviewformuser.dto");
const multer_1 = require("multer");
const imageFilter_helpers_1 = require("../../helpers/imageFilter.helpers");
const sortbyheader_decorator_1 = require("../../decorators/sortbyheader.decorator");
const service_service_1 = require("./service.service");
const serviceforcreate_dto_1 = require("./dto/serviceforcreate.dto");
const serviceforupdate_dto_1 = require("./dto/serviceforupdate.dto");
const swagger_1 = require("@nestjs/swagger");
let ServiceController = class ServiceController {
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    async createService(serviceForCreate, file) {
        serviceForCreate.img_path =
            'http://194.62.19.52:7000/' + file.path.split('\\')[1];
        return await this.serviceService.createService(serviceForCreate);
    }
    async getAllproducts(sort, sortby) {
        return await this.serviceService.getAll(sort, sortby);
    }
    async searchServicess(sort, sortby, name, text, min_price, max_price) {
        let filters = { name: null };
        if (name)
            filters.name = name;
        if (text)
            filters.text = text;
        if (min_price)
            filters.min_price = min_price;
        if (max_price)
            filters.max_price = max_price;
        if (!sort)
            sort = sort_enum_1.Sort.asc;
        return await this.serviceService.findByFilters(filters, sort, sortby);
    }
    async makeReviewForService(serviceId, currentUser, review) {
        return await this.serviceService.makeReview(currentUser.userId, currentUser.email, serviceId, review);
    }
    async updateService(serviceId, serviceForUpdate, file) {
        return await this.serviceService.updateService(serviceId, serviceForUpdate, 'http://194.62.19.52:7000/' + file.path.split('\\')[1]);
    }
    async getService(id) {
        return await this.serviceService.getOne(id);
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
    __metadata("design:paramtypes", [serviceforcreate_dto_1.ServiceForCreate, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "createService", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'РїРѕР»СѓС‡РёС‚СЊ РІСЃРµ РїСЂРѕРґСѓРєС‚С‹ (РїР°СЂР°РјРµС‚СЂС‹ СЃРѕСЂС‚РёСЂРѕРІРєРё asc/desc)',
    }),
    (0, common_1.Get)(),
    __param(0, (0, sortheader_decorator_1.Sorting)()),
    __param(1, (0, sortbyheader_decorator_1.SortingBy)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "getAllproducts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'РїРѕРёСЃРє СѓСЃР»СѓРі РїРѕ С„РёР»СЊС‚СЂР°Рј' }),
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('sort')),
    __param(1, (0, common_1.Query)('by')),
    __param(2, (0, common_1.Query)('name')),
    __param(3, (0, common_1.Query)('text')),
    __param(4, (0, common_1.Query)('minprice')),
    __param(5, (0, common_1.Query)('maxprice')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "searchServicess", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'РѕСЃС‚Р°РІРёС‚СЊ РѕС‚Р·С‹РІ Рѕ СѓСЃР»СѓРіРµ РїРѕ id',
    }),
    (0, common_1.Post)('makereview/:serviceId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('serviceId')),
    __param(1, (0, currentuser_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)(new joivalidation_pipe_1.JoiValidationPipe(reviewFromUser_schema_1.reviewFromUserSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, reviewformuser_dto_1.ReviewFromUser]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "makeReviewForService", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'РёР·РјРµРЅРёС‚СЊ РёРЅС„РѕСЂРјР°С†РёСЋ Рѕ СѓСЃР»СѓРіРµ РїРѕ id',
    }),
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
    __metadata("design:paramtypes", [String, serviceforupdate_dto_1.ServiceForUpdate, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "updateService", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'РїРѕР»СѓС‡РёС‚СЊ РёРЅС„РѕСЂРјР°С†РёСЋ Рѕ СѓСЃР»СѓРіРµ РїРѕ id',
    }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "getService", null);
ServiceController = __decorate([
    (0, common_1.Controller)('service'),
    __metadata("design:paramtypes", [service_service_1.ServiceService])
], ServiceController);
exports.ServiceController = ServiceController;
//# sourceMappingURL=service.controller.js.map