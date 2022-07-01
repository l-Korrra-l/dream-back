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
exports.CategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const errors_1 = require("../../errors/errors");
let CategoryRepository = class CategoryRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const category = await this.prisma.category.create({
            data,
        });
        return category;
    }
    async update(id, data) {
        return await this.prisma.category.update({
            where: {
                id: Number(id),
            },
            include: {
                _count: {
                    select: { products: true },
                },
            },
            data,
        });
    }
    async updateN(id, data) {
        return await this.prisma.category.update({
            where: {
                id: id,
            },
            include: {
                _count: {
                    select: { products: true },
                },
            },
            data,
        });
    }
    async findOne(id) {
        const slider = await this.prisma.category.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                _count: {
                    select: { products: true },
                },
            },
        });
        if (slider) {
            return slider;
        }
        throw new errors_1.NotFound('Not found category');
    }
    async findAll() {
        return await this.prisma.category.findMany({
            include: {
                _count: {
                    select: { products: true },
                },
            },
        });
    }
    async delete(id) {
        const slider = await this.prisma.category.delete({
            where: {
                id: Number(id),
            },
            include: {
                _count: {
                    select: { products: true },
                },
            },
        });
        if (slider) {
            return true;
        }
        throw new errors_1.NotFound('Not found slider for delete');
    }
};
CategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], CategoryRepository);
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=category.repository.js.map