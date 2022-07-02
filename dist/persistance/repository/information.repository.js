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
exports.InformationRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const errors_1 = require("../../errors/errors");
let InformationRepository = class InformationRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const information = await this.prisma.information.create({
            data,
        });
        return information;
    }
    async update(id, data) {
        return await this.prisma.information.update({
            where: {
                id: Number(id),
            },
            data,
        });
    }
    async delete(id) {
        const information = await this.prisma.information.delete({
            where: {
                id: Number(id),
            },
        });
        if (information) {
            return true;
        }
        throw new errors_1.NotFound('Not found information for delete');
    }
    async deleteByProduct(id) {
        const information = await this.prisma.information.deleteMany({
            where: {
                prodId: Number(id),
            },
        });
        if (information) {
            return true;
        }
        throw new errors_1.NotFound('Not found information for delete');
    }
    async findOne(id) {
        const information = await this.prisma.information.findFirst({
            where: {
                id: Number(id),
            },
        });
        if (information) {
            return information;
        }
        throw new errors_1.NotFound('Not found information');
    }
    async getById(id) {
        const information = await this.prisma.information.findFirst({
            where: {
                id: id,
            },
        });
        if (information) {
            return information;
        }
        throw new errors_1.NotFound('Not found information');
    }
    async findAll() {
        return await this.prisma.information.findMany();
    }
    async findByProduct(id) {
        return (await this.prisma.information.findMany({
            where: {
                prodId: Number(id),
            },
        }));
    }
};
InformationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], InformationRepository);
exports.InformationRepository = InformationRepository;
//# sourceMappingURL=information.repository.js.map