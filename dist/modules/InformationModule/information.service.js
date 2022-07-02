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
exports.InformationService = void 0;
const common_1 = require("@nestjs/common");
const information_repository_1 = require("../../persistance/repository/information.repository");
let InformationService = class InformationService {
    constructor(informationRepository) {
        this.informationRepository = informationRepository;
    }
    async createInformation(inputInformation) {
        return await this.informationRepository.create(inputInformation);
    }
    async deleteInformation(id) {
        return await this.informationRepository.delete(id);
    }
    async deleteInformationByProduct(id) {
        return await this.informationRepository.deleteByProduct(id);
    }
    async deleteInformationByProductAndName(id, name) {
        return await this.informationRepository.deleteByProduct(id);
    }
    async getOne(id) {
        return await this.informationRepository.findOne(id);
    }
    async getAll() {
        return await this.informationRepository.findAll();
    }
    async findByProduct(id) {
        return await this.informationRepository.findByProduct(id);
    }
    async updateInformation(informationId, informationForUpdate, newImage) {
        const information = await this.informationRepository.findOne(informationId);
        informationForUpdate.img_path = newImage;
        return await this.informationRepository.update(informationId, informationForUpdate);
    }
    async updateInformationWithoutPicture(informationId, informationForUpdate) {
        return await this.informationRepository.update(informationId, informationForUpdate);
    }
};
InformationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [information_repository_1.InformationRepository])
], InformationService);
exports.InformationService = InformationService;
//# sourceMappingURL=information.service.js.map