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
exports.MemoryRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const errors_1 = require("../../errors/errors");
let MemoryRepository = class MemoryRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const memory = await this.prisma.memory.create({
            data,
        });
        return memory;
    }
    async update(id, data) {
        return await this.prisma.memory.update({
            where: {
                id: Number(id),
            },
            data,
        });
    }
    async delete(id) {
        const memory = await this.prisma.memory.delete({
            where: {
                id: Number(id),
            },
        });
        if (memory) {
            return true;
        }
        throw new errors_1.NotFound('Not found memory for delete');
    }
    async deleteByProduct(id) {
        const memory = await this.prisma.memory.deleteMany({
            where: {
                prodId: Number(id),
            },
        });
        if (memory) {
            return true;
        }
        throw new errors_1.NotFound('Not found memory for delete');
    }
    async deleteByProductAndName(id, name) {
        const memory = await this.prisma.memory.deleteMany({
            where: {
                prodId: Number(id),
                size: {
                    contains: name,
                },
            },
        });
        if (memory) {
            return true;
        }
        throw new errors_1.NotFound('Not found memory for delete');
    }
    async findOne(id) {
        const memory = await this.prisma.memory.findFirst({
            where: {
                id: Number(id),
            },
        });
        if (memory) {
            return memory;
        }
        throw new errors_1.NotFound('Not found memory');
    }
    async getById(id) {
        const memory = await this.prisma.memory.findFirst({
            where: {
                id: id,
            },
        });
        if (memory) {
            return memory;
        }
        throw new errors_1.NotFound('Not found memory');
    }
    async findAll() {
        return await this.prisma.memory.findMany();
    }
    async findByValue(name) {
        return (await this.prisma.memory.findMany({
            where: {
                size: {
                    contains: name,
                },
            },
        }));
    }
    async findByProduct(id) {
        return (await this.prisma.memory.findMany({
            where: {
                prodId: Number(id),
            },
        }));
    }
};
MemoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], MemoryRepository);
exports.MemoryRepository = MemoryRepository;
//# sourceMappingURL=memory.repository.js.map