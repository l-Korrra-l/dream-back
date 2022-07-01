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
exports.ColorRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const errors_1 = require("../../errors/errors");
let ColorRepository = class ColorRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const color = await this.prisma.color.create({
            data,
        });
        return color;
    }
    async update(id, data) {
        return await this.prisma.color.update({
            where: {
                id: Number(id),
            },
            data,
        });
    }
    async delete(id) {
        const color = await this.prisma.color.delete({
            where: {
                id: Number(id),
            },
        });
        if (color) {
            return true;
        }
        throw new errors_1.NotFound('Not found color for delete');
    }
    async deleteByProduct(id) {
        const color = await this.prisma.color.deleteMany({
            where: {
                prodId: Number(id),
            },
        });
        if (color) {
            return true;
        }
        throw new errors_1.NotFound('Not found color for delete');
    }
    async deleteByProductAndName(id, name) {
        const color = await this.prisma.color.deleteMany({
            where: {
                prodId: Number(id),
                color: {
                    contains: name,
                },
            },
        });
        if (color) {
            return true;
        }
        throw new errors_1.NotFound('Not found color for delete');
    }
    async findOne(id) {
        const color = await this.prisma.color.findFirst({
            where: {
                id: Number(id),
            },
        });
        if (color) {
            return color;
        }
        throw new errors_1.NotFound('Not found color');
    }
    async getById(id) {
        const color = await this.prisma.color.findFirst({
            where: {
                id: id,
            },
        });
        if (color) {
            return color;
        }
        throw new errors_1.NotFound('Not found color');
    }
    async findAll() {
        return await this.prisma.color.findMany();
    }
    async findByValue(name) {
        return (await this.prisma.color.findMany({
            where: {
                color: {
                    contains: name,
                },
            },
        }));
    }
    async findByProduct(id) {
        return (await this.prisma.color.findMany({
            where: {
                prodId: Number(id),
            },
        }));
    }
};
ColorRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], ColorRepository);
exports.ColorRepository = ColorRepository;
//# sourceMappingURL=color.repository.js.map