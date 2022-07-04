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
exports.CharacteristicController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../AuthModule/guards/jwt.guard");
const roles_guard_1 = require("../AuthModule/guards/roles.guard");
const characteristic_service_1 = require("./characteristic.service");
let CharacteristicController = class CharacteristicController {
    constructor(characteristicService) {
        this.characteristicService = characteristicService;
    }
    async createCharacteristic(characteristicForCreate) {
        return await this.characteristicService.createCharacteristic(characteristicForCreate);
    }
    async updateCharacteristic(characteristicId, characteristicForUpdate) {
        return await this.characteristicService.updateCharacteristic(characteristicId, characteristicForUpdate);
    }
    async getCharacteristicByName(name) {
        if (name != null && name != undefined && name != '')
            return await this.characteristicService.findByValue(name);
        else
            return await this.characteristicService.getAll();
    }
    async getCharacteristic(id) {
        return await this.characteristicService.getOne(id);
    }
    async deleteCharacteristicByName(name) {
        return await this.characteristicService.deleteCharacteristicByName(name);
    }
    async deleteCharacteristic(id) {
        return await this.characteristicService.deleteCharacteristic(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CharacteristicController.prototype, "createCharacteristic", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CharacteristicController.prototype, "updateCharacteristic", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'получить характеристику по имени, либо все',
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharacteristicController.prototype, "getCharacteristicByName", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'получить характеристику по id',
    }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharacteristicController.prototype, "getCharacteristic", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'удалить характеристику по имени',
    }),
    (0, common_1.Delete)('/'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharacteristicController.prototype, "deleteCharacteristicByName", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'получить характеристику по id',
    }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharacteristicController.prototype, "deleteCharacteristic", null);
CharacteristicController = __decorate([
    (0, common_1.Controller)('characteristic'),
    __metadata("design:paramtypes", [characteristic_service_1.CharacteristicService])
], CharacteristicController);
exports.CharacteristicController = CharacteristicController;
//# sourceMappingURL=characteristic.controller.js.map