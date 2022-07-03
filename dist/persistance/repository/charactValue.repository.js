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
exports.CharactValueRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const errors_1 = require("../../errors/errors");
let CharactValueRepository = class CharactValueRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const charactvalue = await this.prisma.charactValue.create({
            data,
        });
        return charactvalue;
    }
    async update(id, data) {
        return await this.prisma.charactValue.update({
            where: {
                id: Number(id),
            },
            data,
        });
    }
    async delete(id) {
        const charactvalue = await this.prisma.charactValue.delete({
            where: {
                id: Number(id),
            },
        });
        if (charactvalue) {
            return true;
        }
        throw new errors_1.NotFound('Not found charactvalue for delete');
    }
    async deleteByProduct(id) {
        const charactvalue = await this.prisma.charactValue.deleteMany({
            where: {
                prodId: Number(id),
            },
        });
        if (charactvalue) {
            return true;
        }
        throw new errors_1.NotFound('Not found charactvalue for delete');
    }
    async deleteByProductAndValue(id, value) {
        const charactvalue = await this.prisma.charactValue.deleteMany({
            where: {
                prodId: Number(id),
                value: value,
            },
        });
        if (charactvalue) {
            return true;
        }
        throw new errors_1.NotFound('Not found charactvalue for delete');
    }
    async deleteByCharact(id) {
        const charactvalue = await this.prisma.charactValue.deleteMany({
            where: {
                charactId: Number(id),
            },
        });
        if (charactvalue) {
            return true;
        }
        throw new errors_1.NotFound('Not found charactvalue for delete');
    }
    async findOne(id) {
        const charactvalue = await this.prisma.charactValue.findFirst({
            where: {
                id: Number(id),
            },
        });
        if (charactvalue) {
            return charactvalue;
        }
        throw new errors_1.NotFound('Not found charactvalue');
    }
    async getById(id) {
        const charactvalue = await this.prisma.charactValue.findFirst({
            where: {
                id: id,
            },
        });
        if (charactvalue) {
            return charactvalue;
        }
        throw new errors_1.NotFound('Not found charactvalue');
    }
    async findAll() {
        return await this.prisma.charactValue.findMany();
    }
    async findByValue(name) {
        return (await this.prisma.charactValue.findMany({
            where: {
                value: {
                    contains: name,
                },
            },
        }));
    }
    async findByProduct(name) {
        return (await this.prisma.charactValue.findMany({
            where: {
                prodId: Number(name),
            },
        }));
    }
    async findByProductGroupByValue(id) {
        return (await this.prisma.charactValue.findMany({
            where: {
                prodId: Number(id),
            },
            select: {
                value: true,
                characteristic: {
                    select: {
                        name: true,
                        section: {
                            select: {
                                value: true,
                            },
                        },
                    },
                },
            },
        }));
    }
};
CharactValueRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], CharactValueRepository);
exports.CharactValueRepository = CharactValueRepository;
//# sourceMappingURL=charactValue.repository.js.map