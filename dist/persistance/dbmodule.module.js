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
const currency_repository_1 = require("./repository/currency.repository");
const order_repository_1 = require("./repository/order.repository");
const product_repository_1 = require("./repository/product.repository");
const review_repository_1 = require("./repository/review.repository");
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
        ],
        exports: [
            user_repository_1.UserRepository,
            product_repository_1.ProductRepository,
            review_repository_1.ReviewRepository,
            order_repository_1.OrderRepository,
            bucket_repository_1.BucketRepository,
            currency_repository_1.CurrencyRepository,
            slider_repository_1.SliderRepository,
        ],
    })
], DbModule);
exports.DbModule = DbModule;
//# sourceMappingURL=dbmodule.module.js.map