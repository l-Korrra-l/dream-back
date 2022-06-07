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
exports.BucketRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const order_repository_1 = require("./order.repository");
let BucketRepository = class BucketRepository {
    constructor(prisma, orderRepo) {
        this.prisma = prisma;
        this.orderRepo = orderRepo;
    }
    async create(data) {
        return await this.prisma.bucket.create({
            data,
        });
    }
    async update(id, data) {
        return await this.prisma.bucket.update({
            data,
            where: {
                id: Number(id),
            },
        });
    }
    async findOne(id) {
        return await this.prisma.bucket.findUnique({
            where: {
                id: Number(id),
            },
        });
    }
    findByOrder(id) {
        return this.prisma.bucket.findMany({
            where: {
                id: Number(id),
            },
        });
    }
    async deleteByUser(id) {
        const ord = await this.orderRepo.findByUser(id);
        ord.map(async (o) => {
            await this.prisma.bucket.deleteMany({
                where: {
                    orderId: Number(o.id),
                },
            });
        });
        throw new Error('Method not implemented.');
    }
    async deleteByProduct(id) {
        await this.prisma.bucket.deleteMany({
            where: {
                prodId: Number(id),
            },
        });
        throw new Error('Method not implemented.');
    }
    async delete(id) {
        if (await this.prisma.bucket.deleteMany({
            where: {
                id: Number(id),
            },
        }))
            return true;
        else
            return false;
    }
    async deleteByOrderId(id) {
        await this.prisma.bucket.deleteMany({
            where: {
                orderId: Number(id),
            },
        });
    }
    findAll() {
        return this.prisma.bucket.findMany();
    }
};
BucketRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService,
        order_repository_1.OrderRepository])
], BucketRepository);
exports.BucketRepository = BucketRepository;
//# sourceMappingURL=bucket.repository.js.map