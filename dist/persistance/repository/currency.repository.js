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
exports.CurrencyRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let CurrencyRepository = class CurrencyRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    delete(id) {
        throw new Error('Method not implemented.');
    }
    async findOne(id) {
        return await this.prisma.currency.findFirst();
    }
    async findAll() {
        return await this.prisma.currency.findMany();
    }
    async create(data) {
        const currency = await this.prisma.currency.create({
            data,
        });
        return currency;
    }
    async update(currId, data) {
        return (await this.prisma.currency.update({
            where: {
                id: Number(currId),
            },
            data,
        }));
    }
};
CurrencyRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], CurrencyRepository);
exports.CurrencyRepository = CurrencyRepository;
//# sourceMappingURL=currency.repository.js.map