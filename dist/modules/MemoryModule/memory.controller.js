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
exports.MemoryController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../AuthModule/guards/jwt.guard");
const roles_guard_1 = require("../AuthModule/guards/roles.guard");
const memory_service_1 = require("./memory.service");
const memoryforcreate_dto_1 = require("./dto/memoryforcreate.dto");
const swagger_1 = require("@nestjs/swagger");
let MemoryController = class MemoryController {
    constructor(memoryService) {
        this.memoryService = memoryService;
    }
    async createMemory(memoryForCreate) {
        return await this.memoryService.createMemory(memoryForCreate);
    }
    async updateMemory(memoryId, memoryForUpdate) {
        return await this.memoryService.updateMemory(memoryId, memoryForUpdate);
    }
    async getAllmemorys(prod) {
        if (prod != '' && prod != undefined && prod != null)
            return await this.memoryService.findByProduct(prod);
        return await this.memoryService.getAll();
    }
    async getMemory(id) {
        return await this.memoryService.getOne(id);
    }
    async deleteMemoryByProductAndName(prod, name) {
        if (name != null && name != undefined)
            return await this.memoryService.deleteMemoryByProductAndName(prod, name);
        return await this.memoryService.deleteMemoryByProduct(prod);
    }
    async deleteMemory(id) {
        return await this.memoryService.deleteMemory(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [memoryforcreate_dto_1.MemoryForCreate]),
    __metadata("design:returntype", Promise)
], MemoryController.prototype, "createMemory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MemoryController.prototype, "updateMemory", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('prod')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemoryController.prototype, "getAllmemorys", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemoryController.prototype, "getMemory", null);
__decorate([
    (0, common_1.Delete)('/'),
    __param(0, (0, common_1.Query)('prod')),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MemoryController.prototype, "deleteMemoryByProductAndName", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemoryController.prototype, "deleteMemory", null);
MemoryController = __decorate([
    (0, common_1.Controller)('memory'),
    __metadata("design:paramtypes", [memory_service_1.MemoryService])
], MemoryController);
exports.MemoryController = MemoryController;
//# sourceMappingURL=memory.controller.js.map