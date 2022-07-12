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
exports.SubcategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const errors_1 = require("../../errors/errors");
let SubcategoryRepository = class SubcategoryRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const subcategory = await this.prisma.subcategory.create({
            data,
        });
        return subcategory;
    }
    async update(id, data) {
        return await this.prisma.subcategory.update({
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
        return await this.prisma.subcategory.update({
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
        const subcategory = await this.prisma.subcategory.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                _count: {
                    select: { products: true },
                },
            },
        });
        if (subcategory) {
            return subcategory;
        }
        throw new errors_1.NotFound('Not found subcategory');
    }
    async findAll() {
        return await this.prisma.subcategory.findMany({
            include: {
                _count: {
                    select: { products: true },
                },
            },
        });
    }
    async delete(id) {
        const subcategory = await this.prisma.subcategory.delete({
            where: {
                id: Number(id),
            },
            include: {
                _count: {
                    select: { products: true },
                },
            },
        });
        if (subcategory) {
            return true;
        }
        throw new errors_1.NotFound('Not found subcategory for delete');
    }
};
SubcategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], SubcategoryRepository);
exports.SubcategoryRepository = SubcategoryRepository;
//# sourceMappingURL=subcategory.repository.js.map