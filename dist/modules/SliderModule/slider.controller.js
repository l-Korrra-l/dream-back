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
exports.SliderController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const role_enum_1 = require("../../enums/role.enum");
const jwt_guard_1 = require("../AuthModule/guards/jwt.guard");
const roles_guard_1 = require("../AuthModule/guards/roles.guard");
const multer_1 = require("multer");
const imageFilter_helpers_1 = require("../../helpers/imageFilter.helpers");
const silder_service_1 = require("./silder.service");
const SliderForCreate_1 = require("./dto/SliderForCreate");
const uuid_1 = require("uuid");
const path_1 = require("path");
let SliderController = class SliderController {
    constructor(sliderService) {
        this.sliderService = sliderService;
    }
    async createProduct(sliderForCreate, file) {
        sliderForCreate.img_path =
            'http://194.62.19.52:7000/' + file.path.split('\\')[1];
        return await this.sliderService.createSlider(sliderForCreate);
    }
    async updateProduct(sliderForCreate, file, id) {
        sliderForCreate.img_path =
            'http://194.62.19.52:7000/' + file.path.split('\\')[1];
        return await this.sliderService.updateSlider(id, sliderForCreate);
    }
    async getSlider(id) {
        return await this.sliderService.getOne(id);
    }
    async getAllSliders() {
        const order = await this.sliderService.getAll();
        return order;
    }
    async deleteSlider(id) {
        return await this.sliderService.deleteSlider(id);
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
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SliderForCreate_1.SliderForCreate, Object]),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: 'public',
            filename: (req, file, cb) => {
                cb(null, `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: imageFilter_helpers_1.imageFileFilter,
    })),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SliderForCreate_1.SliderForCreate, Object, String]),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "getSlider", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "getAllSliders", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "deleteSlider", null);
SliderController = __decorate([
    (0, common_1.Controller)('slider'),
    __metadata("design:paramtypes", [silder_service_1.SliderService])
], SliderController);
exports.SliderController = SliderController;
//# sourceMappingURL=slider.controller.js.map