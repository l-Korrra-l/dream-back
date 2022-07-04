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
exports.ProductForCreate = void 0;
const swagger_1 = require("@nestjs/swagger");
const runtime_1 = require("@prisma/client/runtime");
class ProductForCreate {
}
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'Samsung Galaxy S20 Ultra' }),
    __metadata("design:type", String)
], ProductForCreate.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: '�������� Samsung Galaxy S20 Ultra' }),
    __metadata("design:type", String)
], ProductForCreate.prototype, "short_descr", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: '�������� Samsung Galaxy S20 Ultra' }),
    __metadata("design:type", String)
], ProductForCreate.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 'Samsung' }),
    __metadata("design:type", String)
], ProductForCreate.prototype, "producer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 100 }),
    __metadata("design:type", Number)
], ProductForCreate.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 20 }),
    __metadata("design:type", Number)
], ProductForCreate.prototype, "in_stock", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        default: 'http://194.62.19.52:7000/Samsung-Galaxy-S20+-Ultra-on-transparent-background-PNG.png',
    }),
    __metadata("design:type", String)
], ProductForCreate.prototype, "img_path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 3 }),
    __metadata("design:type", Number)
], ProductForCreate.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], ProductForCreate.prototype, "subcategoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 0 }),
    __metadata("design:type", runtime_1.Decimal)
], ProductForCreate.prototype, "raiting", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], ProductForCreate.prototype, "characteristics", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], ProductForCreate.prototype, "colors", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], ProductForCreate.prototype, "materials", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], ProductForCreate.prototype, "memory", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], ProductForCreate.prototype, "information", void 0);
exports.ProductForCreate = ProductForCreate;
//# sourceMappingURL=productforcreate.dto.js.map