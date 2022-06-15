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
exports.SliderRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const errors_1 = require("../../errors/errors");
let SliderRepository = class SliderRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const slider = await this.prisma.slider.create({
            data,
        });
        return slider;
    }
    async update(id, data) {
        return await this.prisma.slider.update({
            where: {
                id: Number(id),
            },
            data,
        });
    }
    async updateN(id, data) {
        return await this.prisma.slider.update({
            where: {
                id: id,
            },
            data,
        });
    }
    async findOne(id) {
        const slider = await this.prisma.slider.findFirst({
            select: {
                id: true,
                prodId: true,
                product: true,
                title: true,
                description: true,
                img_path: true,
            },
            where: {
                id: Number(id),
            },
        });
        if (slider) {
            return slider;
        }
        throw new errors_1.NotFound('Not found slider');
    }
    async findAll() {
        return await this.prisma.slider.findMany();
    }
    async delete(id) {
        const slider = await this.prisma.slider.delete({
            where: {
                id: Number(id),
            },
        });
        if (slider) {
            return true;
        }
        throw new errors_1.NotFound('Not found slider for delete');
    }
};
SliderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], SliderRepository);
exports.SliderRepository = SliderRepository;
//# sourceMappingURL=slider.repository.js.map