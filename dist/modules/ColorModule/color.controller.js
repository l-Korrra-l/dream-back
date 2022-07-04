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
exports.ColorController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const uuid_1 = require("uuid");
const path_1 = require("path");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const role_enum_1 = require("../../enums/role.enum");
const jwt_guard_1 = require("../AuthModule/guards/jwt.guard");
const roles_guard_1 = require("../AuthModule/guards/roles.guard");
const color_service_1 = require("./color.service");
const multer_1 = require("multer");
const imageFilter_helpers_1 = require("../../helpers/imageFilter.helpers");
const colorforcreate_dto_1 = require("./dto/colorforcreate.dto");
const swagger_1 = require("@nestjs/swagger");
let ColorController = class ColorController {
    constructor(colorService) {
        this.colorService = colorService;
    }
    async createColor(colorForCreate, file) {
        var _a;
        if (file != undefined)
            colorForCreate.img_path =
                'http://194.62.19.52:7000/' + ((_a = file === null || file === void 0 ? void 0 : file.path) === null || _a === void 0 ? void 0 : _a.split('\\')[1]);
        return await this.colorService.createColor(colorForCreate);
    }
    async updateColor(colorId, colorForUpdate, file) {
        if (file != undefined)
            return await this.colorService.updateColor(colorId, colorForUpdate, 'http://194.62.19.52:7000/' + file.path.split('\\')[1]);
        else
            return await this.colorService.updateColorWithoutPicture(colorId, colorForUpdate);
    }
    async getAllcolors(prod) {
        if (prod != '' && prod != undefined && prod != null)
            return await this.colorService.findByProduct(prod);
        return await this.colorService.getAll();
    }
    async getColor(id) {
        return await this.colorService.getOne(id);
    }
    async deleteColorByProductAndName(prod, name) {
        if (name != null && name != undefined)
            return await this.colorService.deleteColorByProductAndName(prod, name);
        return await this.colorService.deleteColorByProduct(prod);
    }
    async deleteColor(id) {
        return await this.colorService.deleteColor(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiBearerAuth)('access-token'),
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
    __metadata("design:paramtypes", [colorforcreate_dto_1.ColorForCreate, Object]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "createColor", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiBearerAuth)('access-token'),
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
], ColorController.prototype, "updateColor", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('prod')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "getAllcolors", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "getColor", null);
__decorate([
    (0, common_1.Delete)('/'),
    __param(0, (0, common_1.Query)('prod')),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "deleteColorByProductAndName", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "deleteColor", null);
ColorController = __decorate([
    (0, common_1.Controller)('color'),
    __metadata("design:paramtypes", [color_service_1.ColorService])
], ColorController);
exports.ColorController = ColorController;
//# sourceMappingURL=color.controller.js.map