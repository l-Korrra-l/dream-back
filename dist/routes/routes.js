"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const admin_module_1 = require("../modules/AdminModule/admin.module");
const auth_module_1 = require("../modules/AuthModule/auth.module");
const bucket_module_1 = require("../modules/BucketModule/bucket.module");
const category_module_1 = require("../modules/CategoryModule/category.module");
const characteristic_module_1 = require("../modules/CharacteristicModule/characteristic.module");
const charactValue_module_1 = require("../modules/CharactValueModule/charactValue.module");
const color_module_1 = require("../modules/ColorModule/color.module");
const currency_module_1 = require("../modules/Currencymodule/currency.module");
const discount_module_1 = require("../modules/DiscountModule/discount.module");
const discountSeason_module_1 = require("../modules/DiscountSeasonModule/discountSeason.module");
const email_module_1 = require("../modules/EmailModule/email.module");
const information_module_1 = require("../modules/InformationModule/information.module");
const material_module_1 = require("../modules/MaterialModule/material.module");
const memory_module_1 = require("../modules/MemoryModule/memory.module");
const order_module_1 = require("../modules/OrderModule/order.module");
const product_module_1 = require("../modules/ProductModule/product.module");
const seacrh_module_1 = require("../modules/SearchModule/seacrh.module");
const section_module_1 = require("../modules/SectionModule/section.module");
const service_module_1 = require("../modules/ServiceModule/service.module");
const slider_module_1 = require("../modules/SliderModule/slider.module");
const subcategory_module_1 = require("../modules/SubcategoryModule/subcategory.module");
const user_module_1 = require("../modules/UserModule/user.module");
const dbmodule_module_1 = require("../persistance/dbmodule.module");
exports.routes = [
    {
        path: '/api',
        module: dbmodule_module_1.DbModule,
    },
    {
        path: '/api',
        module: auth_module_1.AuthModule,
    },
    {
        path: '/api',
        module: admin_module_1.AdminModule,
    },
    {
        path: '/api',
        module: user_module_1.UserModule,
    },
    {
        path: '/api',
        module: product_module_1.ProductModule,
    },
    {
        path: '/api',
        module: bucket_module_1.BucketModule,
    },
    {
        path: '/api',
        module: order_module_1.OrderModule,
    },
    {
        path: '/api',
        module: service_module_1.ServiceModule,
    },
    {
        path: '/api',
        module: category_module_1.CategoryModule,
    },
    {
        path: '/api',
        module: subcategory_module_1.SubcategoryModule,
    },
    {
        path: '/api',
        module: slider_module_1.SliderModule,
    },
    {
        path: '/api',
        module: currency_module_1.CurrencyModule,
    },
    {
        path: '/api',
        module: color_module_1.ColorModule,
    },
    {
        path: '/api',
        module: memory_module_1.MemoryModule,
    },
    {
        path: '/api',
        module: material_module_1.MaterialModule,
    },
    {
        path: '/api',
        module: characteristic_module_1.CharacteristicModule,
    },
    {
        path: '/api',
        module: charactValue_module_1.CharactValueModule,
    },
    {
        path: '/api',
        module: section_module_1.SectionModule,
    },
    {
        path: '/api',
        module: information_module_1.InformationModule,
    },
    {
        path: '/api',
        module: discount_module_1.DiscountModule,
    },
    {
        path: '/api',
        module: discountSeason_module_1.DiscountSeasonModule,
    },
    {
        path: '/api',
        module: seacrh_module_1.SearchModule,
    },
    {
        path: '/api',
        module: email_module_1.EmailModule,
    },
];
//# sourceMappingURL=routes.js.map