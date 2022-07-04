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
exports.SectionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../AuthModule/guards/jwt.guard");
const roles_guard_1 = require("../AuthModule/guards/roles.guard");
const section_service_1 = require("./section.service");
let SectionController = class SectionController {
    constructor(sectionService) {
        this.sectionService = sectionService;
    }
    async createSection(sectionForCreate) {
        return await this.sectionService.createSection(sectionForCreate);
    }
    async updateSection(sectionId, sectionForUpdate) {
        return await this.sectionService.updateSection(sectionId, sectionForUpdate);
    }
    async getSectionByName(name) {
        if (name != null && name != undefined && name != '')
            return await this.sectionService.findByValue(name);
        else
            return await this.sectionService.getAll();
    }
    async getSection(id) {
        return await this.sectionService.getOne(id);
    }
    async deleteSectionByName(name) {
        return await this.sectionService.deleteSectionByName(name);
    }
    async deleteSection(id) {
        return await this.sectionService.deleteSection(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'добавить раздел описания' }),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
<<<<<<< HEAD
=======
    (0, swagger_1.ApiBearerAuth)('access-token'),
>>>>>>> 376e95b7e43aca62c19acf6875d918e5ba556cad
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "createSection", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'изменить раздел описания по id',
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
<<<<<<< HEAD
=======
    (0, swagger_1.ApiBearerAuth)('access-token'),
>>>>>>> 376e95b7e43aca62c19acf6875d918e5ba556cad
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "updateSection", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'получить разделы описания по имени, либо все',
    }),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "getSectionByName", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'получить раздел описания по id',
    }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "getSection", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'удалить раздел описания по имени',
    }),
    (0, common_1.Delete)('/'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "deleteSectionByName", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'удалить раздел описания по id',
    }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "deleteSection", null);
SectionController = __decorate([
    (0, common_1.Controller)('section'),
    __metadata("design:paramtypes", [section_service_1.SectionService])
], SectionController);
exports.SectionController = SectionController;
//# sourceMappingURL=section.controller.js.map