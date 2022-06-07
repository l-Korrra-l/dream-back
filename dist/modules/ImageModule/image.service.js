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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
let ImageService = class ImageService {
    constructor(configService) {
        this.configService = configService;
    }
    async createImage(image) {
        const generatedId = (0, uuid_1.v4)();
        return {
            imageId: generatedId,
            imageUrl: this.genImageLink(generatedId),
        };
    }
    async updateImage(imageId, image) {
        const { encoding, fieldname, size } = image, imageForUpdate = __rest(image, ["encoding", "fieldname", "size"]);
        await this.storageService.update(imageId, image);
    }
    genImageLink(id) {
        return `${this.configService.get('IMAGE_DIR_PATH')}/${id}`;
    }
    validateImage(image) {
        if (!image) {
            throw new common_1.BadRequestException('Image not defined');
        }
        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(image.mimetype)) {
            throw new common_1.BadRequestException('Wrong image mime type');
        }
    }
};
ImageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map