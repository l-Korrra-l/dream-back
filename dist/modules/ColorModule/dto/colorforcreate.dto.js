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
exports.ColorForCreate = void 0;
const swagger_1 = require("@nestjs/swagger");
class ColorForCreate {
}
__decorate([
    (0, swagger_1.ApiProperty)({ default: 21 }),
    __metadata("design:type", Number)
], ColorForCreate.prototype, "prodId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'gray' }),
    __metadata("design:type", String)
], ColorForCreate.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: '#c6c6c6' }),
    __metadata("design:type", String)
], ColorForCreate.prototype, "color_code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        default: 'http://194.62.19.52:7000/s20_ultra_quandt_1-600x600.jpg',
    }),
    __metadata("design:type", String)
], ColorForCreate.prototype, "img_path", void 0);
exports.ColorForCreate = ColorForCreate;
//# sourceMappingURL=colorforcreate.dto.js.map