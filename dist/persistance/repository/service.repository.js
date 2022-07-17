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
exports.ServiceRepository = void 0;
const common_1 = require("@nestjs/common");
const sort_enum_1 = require("../../enums/sort.enum");
const nestjs_prisma_1 = require("nestjs-prisma");
const errors_1 = require("../../errors/errors");
let ServiceRepository = class ServiceRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const service = await this.prisma.service.create({
            data,
        });
        return service;
    }
    async update(id, data) {
        return await this.prisma.service.update({
            include: {
                reviews: true,
                products: true,
            },
            where: {
                id: Number(id),
            },
            data,
        });
    }
    async connectProduct(serv_id, id) {
        return await this.prisma.service.update({
            where: {
                id: serv_id,
            },
            include: {
                reviews: true,
                products: true,
            },
            data: {
                products: {
                    connect: {
                        id: id,
                    },
                },
            },
        });
    }
    async delete(id) {
        const service = await this.prisma.service.delete({
            where: {
                id: Number(id),
            },
        });
        if (service) {
            return true;
        }
        throw new errors_1.NotFound('Not found service for delete');
    }
    async findOne(id) {
        const service = await this.prisma.service.findFirst({
            include: {
                reviews: true,
                products: true,
            },
            where: {
                id: Number(id),
            },
        });
        if (service) {
            return service;
        }
        throw new errors_1.NotFound('Not found service');
    }
    async getById(id) {
        const service = await this.prisma.service.findFirst({
            include: {
                reviews: true,
                products: true,
            },
            where: {
                id: id,
            },
        });
        if (service) {
            return service;
        }
        throw new errors_1.NotFound('Not found service');
    }
    async findAll() {
        return await this.prisma.service.findMany({
            include: {
                reviews: true,
                products: true,
            },
        });
    }
    async findAllWithSorting(sort, sortby) {
        if (sort == sort_enum_1.Sort.none)
            sort = sort_enum_1.Sort.asc;
        if (sortby == 'price' || sortby == undefined || sortby == null)
            return await this.prisma.service.findMany({
                orderBy: {
                    price: sort,
                },
            });
        if (sortby == 'raiting')
            return await this.prisma.service.findMany({
                orderBy: {
                    raiting: sort,
                },
            });
        if (sortby == 'name')
            return await this.prisma.service.findMany({
                orderBy: {
                    name: sort,
                },
            });
    }
    async findByValue(name, author) {
        return (await this.prisma.service.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                img_path: true,
                price: true,
                raiting: true,
                products: true,
                reviews: {
                    select: {
                        id: true,
                        createdDate: true,
                        raiting: true,
                        authorName: true,
                        productName: true,
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
    async findByName(name, sort) {
        if (sort == sort_enum_1.Sort.none)
            sort = sort_enum_1.Sort.asc;
        return await this.prisma.service.findMany({
            orderBy: {
                _relevance: {
                    fields: 'name',
                    search: name,
                    sort: sort,
                },
            },
        });
    }
    async findWithReviews(id) {
        const service = await this.prisma.service.findFirst({
            include: {
                reviews: true,
            },
            where: {
                id: Number(id),
            },
        });
        if (service) {
            return service;
        }
        throw new errors_1.NotFound('Not found service');
    }
    async findByText(text, sort) {
        if (sort == sort_enum_1.Sort.none)
            sort = sort_enum_1.Sort.asc;
        return await this.prisma.service.findMany({
            orderBy: {
                _relevance: {
                    fields: ['description', 'name', 'short_descr'],
                    search: text,
                    sort: sort,
                },
            },
        });
    }
};
ServiceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], ServiceRepository);
exports.ServiceRepository = ServiceRepository;
//# sourceMappingURL=service.repository.js.map