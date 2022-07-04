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
exports.DiscountSeasonRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const errors_1 = require("../../errors/errors");
let DiscountSeasonRepository = class DiscountSeasonRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const discountseason = await this.prisma.discountSeason.create({
            data,
        });
        return discountseason;
    }
    async update(id, data) {
        return await this.prisma.discountSeason.update({
            where: {
                id: Number(id),
            },
            data,
        });
    }
    async delete(id) {
        const discountseason = await this.prisma.discountSeason.delete({
            where: {
                id: Number(id),
            },
        });
        if (discountseason) {
            return true;
        }
        throw new errors_1.NotFound('Not found discountseason for delete');
    }
    async deleteByName(name) {
        const discountseason = await this.prisma.discountSeason.deleteMany({
            where: {
                name: name,
            },
        });
        if (discountseason) {
            return true;
        }
        throw new errors_1.NotFound('Not found discountseason for delete');
    }
    async findOne(id) {
        const discountseason = await this.prisma.discountSeason.findFirst({
            where: {
                id: Number(id),
            },
        });
        if (discountseason) {
            return discountseason;
        }
        throw new errors_1.NotFound('Not found discountseason');
    }
    async getById(id) {
        const discountseason = await this.prisma.discountSeason.findFirst({
            where: {
                id: id,
            },
        });
        if (discountseason) {
            return discountseason;
        }
        throw new errors_1.NotFound('Not found discountseason');
    }
    async findAll() {
        return await this.prisma.discountSeason.findMany();
    }
    async findByName(name) {
        return (await this.prisma.discountSeason.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
        }));
    }
};
DiscountSeasonRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], DiscountSeasonRepository);
exports.DiscountSeasonRepository = DiscountSeasonRepository;
//# sourceMappingURL=discountSeason.repository.js.map