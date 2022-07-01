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
exports.MaterialRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const errors_1 = require("../../errors/errors");
let MaterialRepository = class MaterialRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const material = await this.prisma.material.create({
            data,
        });
        return material;
    }
    async update(id, data) {
        return await this.prisma.material.update({
            where: {
                id: Number(id),
            },
            data,
        });
    }
    async delete(id) {
        const material = await this.prisma.material.delete({
            where: {
                id: Number(id),
            },
        });
        if (material) {
            return true;
        }
        throw new errors_1.NotFound('Not found material for delete');
    }
    async deleteByProduct(id) {
        const material = await this.prisma.material.deleteMany({
            where: {
                prodId: Number(id),
            },
        });
        if (material) {
            return true;
        }
        throw new errors_1.NotFound('Not found material for delete');
    }
    async deleteByProductAndName(id, name) {
        const material = await this.prisma.material.deleteMany({
            where: {
                prodId: Number(id),
                material: {
                    contains: name,
                },
            },
        });
        if (material) {
            return true;
        }
        throw new errors_1.NotFound('Not found material for delete');
    }
    async findOne(id) {
        const material = await this.prisma.material.findFirst({
            where: {
                id: Number(id),
            },
        });
        if (material) {
            return material;
        }
        throw new errors_1.NotFound('Not found material');
    }
    async getById(id) {
        const material = await this.prisma.material.findFirst({
            where: {
                id: id,
            },
        });
        if (material) {
            return material;
        }
        throw new errors_1.NotFound('Not found material');
    }
    async findAll() {
        return await this.prisma.material.findMany();
    }
    async findByValue(name) {
        return (await this.prisma.material.findMany({
            where: {
                material: {
                    contains: name,
                },
            },
        }));
    }
    async findByProduct(id) {
        return (await this.prisma.material.findMany({
            where: {
                prodId: Number(id),
            },
        }));
    }
};
MaterialRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], MaterialRepository);
exports.MaterialRepository = MaterialRepository;
//# sourceMappingURL=material.repository.js.map