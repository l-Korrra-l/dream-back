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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let OrderRepository = class OrderRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return await this.prisma.order.create({
            data,
        });
    }
    async update(id, data) {
        return await this.prisma.order.update({
            data,
            where: {
                id: Number(id),
            },
        });
    }
    async updateNumId(id, data) {
        return await this.prisma.order.update({
            data,
            where: {
                id: Number(id),
            },
        });
    }
    async delete(id) {
        if (await this.prisma.order.deleteMany({
            where: {
                id: Number(id),
            },
        }))
            return true;
        else
            return false;
    }
    async deleteByUserId(id) {
        await this.prisma.order.deleteMany({
            where: {
                userId: Number(id),
            },
        });
    }
    async findOne(id) {
        return await this.prisma.order.findUnique({
            where: {
                id: Number(id),
            },
        });
    }
    async findByUser(id) {
        return await this.prisma.order.findMany({
            where: {
                userId: Number(id),
            },
        });
    }
    async findAll() {
        return await this.prisma.order.findMany();
    }
};
OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], OrderRepository);
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=order.repository.js.map