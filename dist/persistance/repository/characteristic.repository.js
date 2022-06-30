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
exports.CharacteristicRepository = void 0;
const common_1 = require("@nestjs/common");
const sort_enum_1 = require("../../enums/sort.enum");
const nestjs_prisma_1 = require("nestjs-prisma");
const errors_1 = require("../../errors/errors");
let CharacteristicRepository = class CharacteristicRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const characteristic = await this.prisma.characteristic.create({
            data,
        });
        return characteristic;
    }
    async update(id, data) {
        return await this.prisma.characteristic.update({
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
        const characteristic = await this.prisma.characteristic.delete({
            where: {
                id: Number(id),
            },
        });
        if (characteristic) {
            return true;
        }
        throw new errors_1.NotFound('Not found characteristic for delete');
    }
    async findOne(id) {
        const characteristic = await this.prisma.characteristic.findFirst({
            where: {
                id: Number(id),
            },
        });
        if (characteristic) {
            return characteristic;
        }
        throw new errors_1.NotFound('Not found characteristic');
    }
    async getById(id) {
        const characteristic = await this.prisma.characteristic.findFirst({
            where: {
                id: id,
            },
        });
        if (characteristic) {
            return characteristic;
        }
        throw new errors_1.NotFound('Not found characteristic');
    }
    async findAll() {
        return await this.prisma.characteristic.findMany();
    }
    async findByValue(name) {
        return (await this.prisma.characteristic.findMany({
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
        return await this.prisma.characteristic.findMany({
            orderBy: {
                _relevance: {
                    fields: 'name',
                    search: name,
                    sort: sort,
                },
            },
        });
    }
    async findByText(text, sort) {
        if (sort == sort_enum_1.Sort.none)
            sort = sort_enum_1.Sort.asc;
        return await this.prisma.characteristic.findMany({
            orderBy: {
                _relevance: {
                    fields: ['description', 'name', 'short_descr', 'charact'],
                    search: text,
                    sort: sort,
                },
            },
        });
    }
};
CharacteristicRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], CharacteristicRepository);
exports.CharacteristicRepository = CharacteristicRepository;
//# sourceMappingURL=characteristic.repository.js.map