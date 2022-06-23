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
exports.ReviewRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const errors_1 = require("../../errors/errors");
let ReviewRepository = class ReviewRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return await this.prisma.review.create({
            data,
        });
    }
    async update(id, data) {
        throw new Error('Method not implemented.');
    }
    async delete(id) {
        const review = await this.prisma.review.delete({
            where: {
                id: Number(id),
            },
        });
        if (review) {
            return true;
        }
        throw new errors_1.NotFound('Not found review for delete');
    }
    async findOne(id) {
        return await this.prisma.review.findFirst({
            where: {
                id: Number(id),
            },
        });
    }
    async findAll() {
        return await this.prisma.review.findMany();
    }
    async deleteByUserId(id) {
        await this.prisma.review.deleteMany({
            where: {
                userId: Number(id),
            },
        });
    }
    async getStatsOfProduct(productId) {
        const aggregations = await this.prisma.review.aggregate({
            _count: {
                prodId: true,
            },
            _sum: {
                raiting: true,
            },
            where: {
                prodId: Number(productId),
            },
        });
        return {
            count: aggregations._count.prodId,
            sum: aggregations._sum.raiting,
        };
    }
    async getStatsOfService(productId) {
        const aggregations = await this.prisma.review.aggregate({
            _count: {
                serviceId: true,
            },
            _sum: {
                raiting: true,
            },
            where: {
                prodId: Number(productId),
            },
        });
        return {
            count: aggregations._count.serviceId,
            sum: aggregations._sum.raiting,
        };
    }
};
ReviewRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], ReviewRepository);
exports.ReviewRepository = ReviewRepository;
//# sourceMappingURL=review.repository.js.map