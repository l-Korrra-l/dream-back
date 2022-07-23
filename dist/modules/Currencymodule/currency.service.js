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
exports.CurrencyService = void 0;
const common_1 = require("@nestjs/common");
const currency_repository_1 = require("../../persistance/repository/currency.repository");
let CurrencyService = class CurrencyService {
    constructor(currencyRepository) {
        this.currencyRepository = currencyRepository;
    }
    async createCurrency(currency) {
        const curr = await this.currencyRepository.create({
            rate: Number(currency),
            date: new Date(),
        });
        return curr;
    }
    async getOne() {
        return await this.currencyRepository.findOne('1');
    }
    async updateCurrency(newRate) {
        const curr = await this.currencyRepository.update('1', {
            rate: parseFloat(newRate),
            date: new Date(),
        });
        return curr;
    }
};
CurrencyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [currency_repository_1.CurrencyRepository])
], CurrencyService);
exports.CurrencyService = CurrencyService;
//# sourceMappingURL=currency.service.js.map