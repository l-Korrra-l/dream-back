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
exports.SectionRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const errors_1 = require("../../errors/errors");
let SectionRepository = class SectionRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const section = await this.prisma.section.create({
            data,
        });
        return section;
    }
    async update(id, data) {
        return await this.prisma.section.update({
            where: {
                id: Number(id),
            },
            data,
        });
    }
    async delete(id) {
        const section = await this.prisma.section.delete({
            where: {
                id: Number(id),
            },
        });
        if (section) {
            return true;
        }
        throw new errors_1.NotFound('Not found section for delete');
    }
    async deleteByName(id) {
        const section = await this.prisma.section.deleteMany({
            where: {
                value: id,
            },
        });
        if (section) {
            return true;
        }
        throw new errors_1.NotFound('Not found section for delete');
    }
    async findOne(id) {
        const section = await this.prisma.section.findFirst({
            where: {
                id: Number(id),
            },
        });
        if (section) {
            return section;
        }
        throw new errors_1.NotFound('Not found section');
    }
    async getById(id) {
        const section = await this.prisma.section.findFirst({
            where: {
                id: id,
            },
        });
        if (section) {
            return section;
        }
        throw new errors_1.NotFound('Not found section');
    }
    async findAll() {
        return await this.prisma.section.findMany({});
    }
    async findByValue(name) {
        return (await this.prisma.section.findMany({
            where: {
                value: {
                    contains: name,
                },
            },
        }));
    }
};
SectionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], SectionRepository);
exports.SectionRepository = SectionRepository;
//# sourceMappingURL=section.repository.js.map