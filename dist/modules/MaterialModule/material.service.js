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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialService = void 0;
const common_1 = require("@nestjs/common");
const material_repository_1 = require("../../persistance/repository/material.repository");
let MaterialService = class MaterialService {
    constructor(materialRepository) {
        this.materialRepository = materialRepository;
    }
    async createMaterial(inputMaterial) {
        return await this.materialRepository.create(inputMaterial);
    }
    async deleteMaterial(id) {
        return await this.materialRepository.delete(id);
    }
    async deleteMaterialByProduct(id) {
        return await this.materialRepository.deleteByProduct(id);
    }
    async deleteMaterialByProductAndName(id, name) {
        return await this.materialRepository.deleteByProductAndName(id, name);
    }
    async getOne(id) {
        return await this.materialRepository.findOne(id);
    }
    async getAll() {
        return await this.materialRepository.findAll();
    }
    async findByProduct(id) {
        return await this.materialRepository.findByProduct(id);
    }
    async findByValue(name) {
        return await this.materialRepository.findByValue(name);
    }
    async updateMaterial(materialId, materialForUpdate, newImage) {
        const material = await this.materialRepository.findOne(materialId);
        materialForUpdate.img_path = newImage;
        return await this.materialRepository.update(materialId, materialForUpdate);
    }
};
MaterialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [material_repository_1.MaterialRepository])
], MaterialService);
exports.MaterialService = MaterialService;
//# sourceMappingURL=material.service.js.map