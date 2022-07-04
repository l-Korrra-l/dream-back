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
exports.CharactValueController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../AuthModule/guards/jwt.guard");
const roles_guard_1 = require("../AuthModule/guards/roles.guard");
const charactValue_service_1 = require("./charactValue.service");
const characteristicvalueforcreate_dto_1 = require("./dto/characteristicvalueforcreate.dto");
let CharactValueController = class CharactValueController {
    constructor(charactvalueService) {
        this.charactvalueService = charactvalueService;
    }
    async createCharactValue(charactvalueForCreate) {
        return await this.charactvalueService.createCharactValue(charactvalueForCreate);
    }
    async updateCharactValue(charactvalueId, charactvalueForUpdate) {
        return await this.charactvalueService.updateCharactValue(charactvalueId, charactvalueForUpdate);
    }
    async getAllcharactvalues(prod) {
        if (prod != '' && prod != undefined && prod != null)
            return await this.charactvalueService.findByProduct(prod);
        return await this.charactvalueService.getAll();
    }
    async getCharactValue(id) {
        return await this.charactvalueService.getOne(id);
    }
    async deleteCharactValueByProductAndName(prod, name) {
        if (name != null && name != undefined)
            return await this.charactvalueService.deleteCharactValueByProductAndValue(prod, name);
        return await this.charactvalueService.deleteCharactValueByProduct(prod);
    }
    async deleteCharactValue(id) {
        return await this.charactvalueService.deleteCharactValue(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [characteristicvalueforcreate_dto_1.CharacteristicValueForCreate]),
    __metadata("design:returntype", Promise)
], CharactValueController.prototype, "createCharactValue", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CharactValueController.prototype, "updateCharactValue", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('prod')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharactValueController.prototype, "getAllcharactvalues", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharactValueController.prototype, "getCharactValue", null);
__decorate([
    (0, common_1.Delete)('/'),
    __param(0, (0, common_1.Query)('prod')),
    __param(1, (0, common_1.Query)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CharactValueController.prototype, "deleteCharactValueByProductAndName", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharactValueController.prototype, "deleteCharactValue", null);
CharactValueController = __decorate([
    (0, common_1.Controller)('charactvalue'),
    __metadata("design:paramtypes", [charactValue_service_1.CharactValueService])
], CharactValueController);
exports.CharactValueController = CharactValueController;
//# sourceMappingURL=charactValue.controller.js.map