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
exports.DiscountRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const errors_1 = require("../../errors/errors");
let DiscountRepository = class DiscountRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const discount = await this.prisma.discount.create({
            data,
        });
        return discount;
    }
    async update(id, data) {
        return await this.prisma.discount.update({
            where: {
                id: Number(id),
            },
            data,
        });
    }
    async delete(id) {
        const discount = await this.prisma.discount.delete({
            where: {
                id: Number(id),
            },
        });
        if (discount) {
            return true;
        }
        throw new errors_1.NotFound('Not found discount for delete');
    }
    async deleteByProduct(id) {
        const discount = await this.prisma.discount.deleteMany({
            where: {
                prodId: Number(id),
            },
        });
        if (discount) {
            return true;
        }
        throw new errors_1.NotFound('Not found discount for delete');
    }
    async findOne(id) {
        const discount = await this.prisma.discount.findFirst({
            where: {
                id: Number(id),
            },
        });
        if (discount) {
            return discount;
        }
        throw new errors_1.NotFound('Not found discount');
    }
    async getById(id) {
        const discount = await this.prisma.discount.findFirst({
            where: {
                id: id,
            },
        });
        if (discount) {
            return discount;
        }
        throw new errors_1.NotFound('Not found discount');
    }
    async findAll() {
        return await this.prisma.discount.findMany();
    }
    async findByProduct(id) {
        return (await this.prisma.discount.findMany({
            where: {
                prodId: Number(id),
            },
        }));
    }
};
DiscountRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], DiscountRepository);
exports.DiscountRepository = DiscountRepository;
//# sourceMappingURL=discount.repository.js.map