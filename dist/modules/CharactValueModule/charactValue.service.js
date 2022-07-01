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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharactValueService = void 0;
const common_1 = require("@nestjs/common");
const charactvalue_repository_1 = require("src/persistance/repository/charactvalue.repository");
let CharactValueService = class CharactValueService {
    constructor(charactvalueRepository) {
        this.charactvalueRepository = charactvalueRepository;
    }
    async createCharactValue(inputCharactValue) {
        return await this.charactvalueRepository.create(inputCharactValue);
    }
    async deleteCharactValue(id) {
        return await this.charactvalueRepository.delete(id);
    }
    async deleteCharactValueByProduct(id) {
        return await this.charactvalueRepository.deleteByProduct(id);
    }
    async deleteCharactValueByProductAndValue(id, name) {
        return await this.charactvalueRepository.deleteByProductAndValue(id, name);
    }
    async getOne(id) {
        return await this.charactvalueRepository.findOne(id);
    }
    async getAll() {
        return await this.charactvalueRepository.findAll();
    }
    async findByProduct(id) {
        return await this.charactvalueRepository.findByProduct(id);
    }
    async findByValue(name) {
        return await this.charactvalueRepository.findByValue(name);
    }
    async updateCharactValue(charactvalueId, charactvalueForUpdate) {
        const charactvalue = await this.charactvalueRepository.findOne(charactvalueId);
        return await this.charactvalueRepository.update(charactvalueId, charactvalueForUpdate);
    }
};
CharactValueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof charactvalue_repository_1.CharactValueRepository !== "undefined" && charactvalue_repository_1.CharactValueRepository) === "function" ? _a : Object])
], CharactValueService);
exports.CharactValueService = CharactValueService;
//# sourceMappingURL=charactValue.service.js.map