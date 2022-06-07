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
exports.RecordController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const currentuser_decorator_1 = require("../../decorators/currentuser.decorator");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const sortheader_decorator_1 = require("../../decorators/sortheader.decorator");
const role_enum_1 = require("../../enums/role.enum");
const sort_enum_1 = require("../../enums/sort.enum");
const joivalidation_pipe_1 = require("../../validation/joivalidation.pipe");
const recordForCreate_schema_1 = require("../../validation/schemas/recordForCreate.schema");
const recordForUpdate_1 = require("../../validation/schemas/recordForUpdate");
const reviewFromUser_schema_1 = require("../../validation/schemas/reviewFromUser.schema");
const jwt_guard_1 = require("../AuthModule/guards/jwt.guard");
const roles_guard_1 = require("../AuthModule/guards/roles.guard");
const recordforcreate_dto_1 = require("./dto/recordforcreate.dto");
const recordforupdate_dto_1 = require("./dto/recordforupdate.dto");
const reviewformuser_dto_1 = require("./dto/reviewformuser.dto");
const record_service_1 = require("./record.service");
let RecordController = class RecordController {
    constructor(recordService) {
        this.recordService = recordService;
    }
    async createRecord(recordForCreate, image) {
        recordForCreate.image = image;
        return await this.recordService.createRecord(recordForCreate);
    }
    async getRecord(id) {
        return await this.recordService.getOne(id);
    }
    async getAllrecords(sort) {
        return await this.recordService.getAll(sort);
    }
    async searchRecords(valueForSearch) {
        const name = valueForSearch;
        const author = valueForSearch;
        return await this.recordService.findByValue(name, author);
    }
    async makeReviewForRecord(recordId, currentUser, review) {
        return await this.recordService.makeReview(currentUser.userId, currentUser.email, recordId, review);
    }
    async updateRecord(recordId, recordForUpdate, newimage) {
        return await this.recordService.updateRecord(recordId, recordForUpdate, newimage);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)(new joivalidation_pipe_1.JoiValidationPipe(recordForCreate_schema_1.recordForCreateSchema))),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recordforcreate_dto_1.RecordForCreate, Object]),
    __metadata("design:returntype", Promise)
], RecordController.prototype, "createRecord", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecordController.prototype, "getRecord", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, sortheader_decorator_1.Sorting)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecordController.prototype, "getAllrecords", null);
__decorate([
    (0, common_1.Get)('search/:value'),
    __param(0, (0, common_1.Param)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecordController.prototype, "searchRecords", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('makereview/:recordId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('recordId')),
    __param(1, (0, currentuser_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)(new joivalidation_pipe_1.JoiValidationPipe(reviewFromUser_schema_1.reviewFromUserSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, reviewformuser_dto_1.ReviewFromUser]),
    __metadata("design:returntype", Promise)
], RecordController.prototype, "makeReviewForRecord", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('newimage')),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new joivalidation_pipe_1.JoiValidationPipe(recordForUpdate_1.recordForUpdateSchema))),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, recordforupdate_dto_1.RecordForUpdate, Object]),
    __metadata("design:returntype", Promise)
], RecordController.prototype, "updateRecord", null);
RecordController = __decorate([
    (0, common_1.Controller)('record'),
    __metadata("design:paramtypes", [record_service_1.RecordService])
], RecordController);
exports.RecordController = RecordController;
//# sourceMappingURL=record.controller.js.map