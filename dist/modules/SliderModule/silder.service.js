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
exports.SliderService = void 0;
const common_1 = require("@nestjs/common");
const slider_repository_1 = require("../../persistance/repository/slider.repository");
let SliderService = class SliderService {
    constructor(sliderRepository) {
        this.sliderRepository = sliderRepository;
    }
    async createSlider(inputSlider) {
        return await this.sliderRepository.create(inputSlider);
    }
    async getOne(id) {
        return await this.sliderRepository.findOne(id);
    }
    async getAll() {
        return await this.sliderRepository.findAll();
    }
    async updateSlider(id, inputSlider) {
        return await this.sliderRepository.update(id, inputSlider);
    }
    async deleteSlider(id) {
        return await this.sliderRepository.delete(id);
    }
};
SliderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [slider_repository_1.SliderRepository])
], SliderService);
exports.SliderService = SliderService;
//# sourceMappingURL=silder.service.js.map