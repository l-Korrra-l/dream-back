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
exports.ColorService = void 0;
const common_1 = require("@nestjs/common");
const color_repository_1 = require("../../persistance/repository/color.repository");
let ColorService = class ColorService {
    constructor(colorRepository) {
        this.colorRepository = colorRepository;
    }
    async createColor(inputColor) {
        return await this.colorRepository.create(inputColor);
    }
    async deleteColor(id) {
        return await this.colorRepository.delete(id);
    }
    async deleteColorByProduct(id) {
        return await this.colorRepository.deleteByProduct(id);
    }
    async deleteColorByProductAndName(id, name) {
        return await this.colorRepository.deleteByProductAndName(id, name);
    }
    async getOne(id) {
        return await this.colorRepository.findOne(id);
    }
    async getAll() {
        return await this.colorRepository.findAll();
    }
    async findByProduct(id) {
        return await this.colorRepository.findByProduct(id);
    }
    async findByValue(name) {
        return await this.colorRepository.findByValue(name);
    }
    async updateColor(colorId, colorForUpdate, newImage) {
        const color = await this.colorRepository.findOne(colorId);
        colorForUpdate.img_path = newImage;
        return await this.colorRepository.update(colorId, colorForUpdate);
    }
    async updateColorWithoutPicture(colorId, colorForUpdate) {
        return await this.colorRepository.update(colorId, colorForUpdate);
    }
};
ColorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [color_repository_1.ColorRepository])
], ColorService);
exports.ColorService = ColorService;
//# sourceMappingURL=color.service.js.map