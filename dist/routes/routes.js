"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const admin_module_1 = require("../modules/AdminModule/admin.module");
const auth_module_1 = require("../modules/AuthModule/auth.module");
const bucket_module_1 = require("../modules/BucketModule/bucket.module");
const category_module_1 = require("../modules/CategoryModule/category.module");
const currency_module_1 = require("../modules/Currencymodule/currency.module");
const email_module_1 = require("../modules/EmailModule/email.module");
const order_module_1 = require("../modules/OrderModule/order.module");
const product_module_1 = require("../modules/ProductModule/product.module");
const service_module_1 = require("../modules/ServiceModule/service.module");
const slider_module_1 = require("../modules/SliderModule/slider.module");
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
        module: email_module_1.EmailModule,
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
        module: slider_module_1.SliderModule,
    },
    {
        path: '/api',
        module: currency_module_1.CurrencyModule,
    },
];
//# sourceMappingURL=routes.js.map