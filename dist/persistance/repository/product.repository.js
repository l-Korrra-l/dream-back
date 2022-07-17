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
            include: {
                reviews: true,
                CharactValue: true,
                colors: true,
                Memory: true,
                materials: true,
                services: true,
            },
            data,
        });
        return await this.prisma.product.findFirst({
            include: {
                reviews: true,
                CharactValue: true,
                colors: true,
                Memory: true,
                materials: true,
                category: true,
                subcategory: true,
                services: true,
            },
            where: {
                id: product.id,
            },
        });
    }
    async update(id, data) {
        return await this.prisma.product.update({
            include: {
                reviews: true,
                CharactValue: true,
                colors: true,
                Memory: true,
                materials: true,
                services: true,
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
            include: {
                services: true,
                reviews: {
                    select: {
                        body: true,
                        createdDate: true,
                        raiting: true,
                        authorName: true,
                        productName: true,
                        text: true,
                    },
                },
                colors: false,
                Memory: {
                    select: {
                        size: true,
                    },
                },
                materials: {
                    select: {
                        material: true,
                        img_path: true,
                    },
                },
                category: {
                    select: {
                        categoryName: true,
                    },
                },
                subcategory: {
                    select: {
                        name: true,
                    },
                },
                Information: {
                    select: {
                        color: true,
                        img_path: true,
                        text: true,
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
                services: true,
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
    async getById(id) {
        const product = await this.prisma.product.findFirst({
            include: {
                reviews: true,
                CharactValue: true,
                colors: true,
                Memory: true,
                materials: true,
                category: true,
                subcategory: true,
                services: true,
            },
            where: {
                id: id,
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
                services: true,
            },
        });
    }
    async findAllWithSorting(sort, sortby, page) {
        if (sort == sort_enum_1.Sort.none)
            sort = sort_enum_1.Sort.asc;
        if (sortby == 'price' || sortby == undefined || sortby == null)
            return await this.prisma.product.findMany({
                take: 30,
                skip: 30 * (Number(page) - 1),
                orderBy: {
                    price: sort,
                },
            });
        if (sortby == 'raiting')
            return await this.prisma.product.findMany({
                take: 30,
                skip: 30 * (Number(page) - 1),
                orderBy: {
                    raiting: sort,
                },
            });
        if (sortby == 'name')
            return await this.prisma.product.findMany({
                take: 30,
                skip: 30 * (Number(page) - 1),
                orderBy: {
                    name: sort,
                },
            });
    }
    async findByValue(name, author) {
        return (await this.prisma.product.findMany({
            include: {
                reviews: true,
                CharactValue: true,
                colors: true,
                Memory: true,
                materials: true,
                category: true,
                subcategory: true,
                services: true,
            },
            where: {
                name: {
                    contains: name,
                },
            },
        }));
    }
    async findByName(name, sort) {
        if (sort == sort_enum_1.Sort.none)
            sort = sort_enum_1.Sort.desc;
        return await this.prisma.product.findMany({
            include: {
                reviews: true,
                CharactValue: true,
                colors: true,
                Memory: true,
                materials: true,
                category: true,
                subcategory: true,
                services: true,
            },
            where: {
                name: name,
            },
        });
    }
    async findByProducer(prod, sort, sortby) {
        if (sort == sort_enum_1.Sort.none)
            sort = sort_enum_1.Sort.asc;
        if (sortby == 'price' || sortby == undefined || sortby == null)
            return await this.prisma.product.findMany({
                where: {
                    producer: {
                        search: prod,
                    },
                },
                orderBy: {
                    price: sort,
                },
            });
        if (sortby == 'raiting')
            return await this.prisma.product.findMany({
                where: {
                    producer: {
                        search: prod,
                    },
                },
                orderBy: {
                    raiting: sort,
                },
            });
        if (sortby == 'name')
            return await this.prisma.product.findMany({
                where: {
                    producer: {
                        search: prod,
                    },
                },
                orderBy: {
                    name: sort,
                },
            });
    }
    async findByText(text, sort) {
        if (sort == sort_enum_1.Sort.none)
            sort = sort_enum_1.Sort.asc;
        return await this.prisma.product.findMany({
            orderBy: {
                _relevance: {
                    fields: ['name', 'short_descr', 'description'],
                    search: text,
                    sort: sort,
                },
            },
        });
    }
};
ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], ProductRepository);
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.repository.js.map