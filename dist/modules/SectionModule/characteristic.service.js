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
exports.CharacteristicService = void 0;
const common_1 = require("@nestjs/common");
const characteristic_repository_1 = require("../../persistance/repository/characteristic.repository");
let CharacteristicService = class CharacteristicService {
    constructor(characteristicRepository) {
        this.characteristicRepository = characteristicRepository;
    }
    async createCharacteristic(inputCharacteristic) {
        return await this.characteristicRepository.create(inputCharacteristic);
    }
    async deleteCharacteristic(id) {
        return await this.characteristicRepository.delete(id);
    }
    async deleteCharacteristicByName(name) {
        return await this.characteristicRepository.deleteByName(name);
    }
    async getOne(id) {
        return await this.characteristicRepository.findOne(id);
    }
    async getAll() {
        return await this.characteristicRepository.findAll();
    }
    async findByValue(name) {
        return await this.characteristicRepository.findByValue(name);
    }
    async updateCharacteristic(characteristicId, characteristicForUpdate) {
        const characteristic = await this.characteristicRepository.findOne(characteristicId);
        return await this.characteristicRepository.update(characteristicId, characteristicForUpdate);
    }
};
CharacteristicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [characteristic_repository_1.CharacteristicRepository])
], CharacteristicService);
exports.CharacteristicService = CharacteristicService;
//# sourceMappingURL=characteristic.service.js.map