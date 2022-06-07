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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const sort_enum_1 = require("../../enums/sort.enum");
const nestjs_prisma_1 = require("nestjs-prisma");
const errors_1 = require("../../errors/errors");
let ProductRepository = class ProductRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const product = await this.prisma.product.create({
            data,
        });
        return product;
    }
    async update(id, data) {
        return await this.prisma.product.update({
            include: {
                reviews: true,
            },
            where: {
                id: Number(id),
            },
            data,
        });
    }
    async delete(id) {
        const product = await this.prisma.product.delete({
            where: {
                id: Number(id),
            },
        });
        if (product) {
            return true;
        }
        throw new errors_1.NotFound('Not found product for delete');
    }
    async findOne(id) {
        const product = await this.prisma.product.findFirst({
            select: {
                id: true,
                name: true,
                description: true,
                img_path: true,
                price: true,
                raiting: true,
                in_stock: true,
                categoryId: true,
                category: {
                    select: {
                        id: true,
                        categoryName: true,
                        img_path: true,
                    },
                },
                reviews: {
                    select: {
                        id: true,
                        createdDate: true,
                        raiting: true,
                        authorName: true,
                        productdName: true,
                        text: true,
                    },
                },
                buckets: {
                    select: {
                        id: true,
                        quantity: true,
                    },
                },
            },
            where: {
                id: Number(id),
            },
        });
        if (product) {
            return product;
        }
        throw new errors_1.NotFound('Not found product');
    }
    async findWithReviews(id) {
        const product = await this.prisma.product.findFirst({
            include: {
                reviews: true,
            },
            where: {
                id: Number(id),
            },
        });
        if (product) {
            return product;
        }
        throw new errors_1.NotFound('Not found product');
    }
    async findAll() {
        return await this.prisma.product.findMany({
            include: {
                reviews: true,
            },
        });
    }
    async findAllWithSorting(sort) {
        if (sort != sort_enum_1.Sort.none) {
            return (await this.prisma.product.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    img_path: true,
                    price: true,
                    raiting: true,
                    in_stock: true,
                    categoryId: true,
                    reviews: {
                        select: {
                            id: true,
                            createdDate: true,
                            raiting: true,
                            authorName: true,
                            productdName: true,
                            text: true,
                        },
                    },
                },
                orderBy: {
                    price: sort,
                },
            }));
        }
        return (await this.prisma.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                img_path: true,
                price: true,
                raiting: true,
                in_stock: true,
                categoryId: true,
                reviews: {
                    select: {
                        id: true,
                        createdDate: true,
                        raiting: true,
                        authorName: true,
                        productdName: true,
                        text: true,
                    },
                },
            },
        }));
    }
    async findByValue(name, author) {
        return (await this.prisma.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                img_path: true,
                price: true,
                raiting: true,
                in_stock: true,
                categoryId: true,
                reviews: {
                    select: {
                        id: true,
                        createdDate: true,
                        raiting: true,
                        authorName: true,
                        productdName: true,
                        text: true,
                    },
                },
            },
            where: {
                name: {
                    contains: name,
                },
            },
        }));
    }
};
ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], ProductRepository);
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.repository.js.map