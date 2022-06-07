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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const errors_1 = require("../../errors/errors");
let UserRepository = class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const user = await this.prisma.user.create({
            data,
        });
        return user;
    }
    async update(userId, data) {
        return (await this.prisma.user.update({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                birthDate: true,
                img_path: true,
                auth: true,
                role: true,
                reviews: {
                    select: {
                        id: true,
                        createdDate: true,
                        raiting: true,
                        authorName: true,
                        text: true,
                    },
                },
                orders: {
                    select: {
                        id: true,
                        totalCost: true,
                        date: true,
                        status: true,
                        buckets: {
                            select: {
                                id: true,
                                quantity: true,
                            },
                        },
                    },
                },
            },
            where: {
                id: Number(userId),
            },
            data,
        }));
    }
    async delete(userId) {
        const user = await this.prisma.user.delete({
            where: {
                id: Number(userId),
            },
        });
        if (user) {
            return true;
        }
        throw new errors_1.NotFound('Not found user for delte');
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (user) {
            return user;
        }
        throw new errors_1.NotFound('Not found user');
    }
    async findAll() {
        return await this.prisma.user.findMany();
    }
    async findForView(id) {
        const user = await this.prisma.user.findUnique({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                birthDate: true,
                img_path: true,
                auth: true,
                role: true,
                reviews: {
                    select: {
                        id: true,
                        createdDate: true,
                        raiting: true,
                        authorName: true,
                        text: true,
                    },
                },
                orders: {
                    select: {
                        id: true,
                        totalCost: true,
                        date: true,
                        status: true,
                        buckets: {
                            select: {
                                id: true,
                                quantity: true,
                            },
                        },
                    },
                },
            },
            where: {
                id: Number(id),
            },
        });
        if (user) {
            return user;
        }
        throw new errors_1.NotFound('Not found user');
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (user) {
            return user;
        }
        throw new errors_1.NotFound('Not found user with this email');
    }
    async canRegister(email) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (user) {
            return false;
        }
        return true;
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map