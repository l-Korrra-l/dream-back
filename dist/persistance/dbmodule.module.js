"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const prisma_config_1 = require("../config/prisma.config");
const bucket_repository_1 = require("./repository/bucket.repository");
const category_repository_1 = require("./repository/category.repository");
const characteristic_repository_1 = require("./repository/characteristic.repository");
const charactValue_repository_1 = require("./repository/charactValue.repository");
const color_repository_1 = require("./repository/color.repository");
const currency_repository_1 = require("./repository/currency.repository");
const material_repository_1 = require("./repository/material.repository");
const memory_repository_1 = require("./repository/memory.repository");
const order_repository_1 = require("./repository/order.repository");
const product_repository_1 = require("./repository/product.repository");
const review_repository_1 = require("./repository/review.repository");
const section_repository_1 = require("./repository/section.repository");
const service_repository_1 = require("./repository/service.repository");
const slider_repository_1 = require("./repository/slider.repository");
const user_repository_1 = require("./repository/user.repository");
let DbModule = class DbModule {
};
DbModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_prisma_1.PrismaModule.forRootAsync(prisma_config_1.prismaConfigAsync)],
        providers: [
            user_repository_1.UserRepository,
            product_repository_1.ProductRepository,
            review_repository_1.ReviewRepository,
            order_repository_1.OrderRepository,
            bucket_repository_1.BucketRepository,
            currency_repository_1.CurrencyRepository,
            slider_repository_1.SliderRepository,
            category_repository_1.CategoryRepository,
            service_repository_1.ServiceRepository,
            characteristic_repository_1.CharacteristicRepository,
            material_repository_1.MaterialRepository,
            memory_repository_1.MemoryRepository,
            color_repository_1.ColorRepository,
            charactValue_repository_1.CharactValueRepository,
            section_repository_1.SectionRepository,
        ],
        exports: [
            user_repository_1.UserRepository,
            product_repository_1.ProductRepository,
            review_repository_1.ReviewRepository,
            order_repository_1.OrderRepository,
            bucket_repository_1.BucketRepository,
            currency_repository_1.CurrencyRepository,
            slider_repository_1.SliderRepository,
            category_repository_1.CategoryRepository,
            service_repository_1.ServiceRepository,
            characteristic_repository_1.CharacteristicRepository,
            material_repository_1.MaterialRepository,
            memory_repository_1.MemoryRepository,
            color_repository_1.ColorRepository,
            charactValue_repository_1.CharactValueRepository,
            section_repository_1.SectionRepository,
        ],
    })
], DbModule);
exports.DbModule = DbModule;
//# sourceMappingURL=dbmodule.module.js.map