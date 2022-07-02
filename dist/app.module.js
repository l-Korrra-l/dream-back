"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/AuthModule/auth.module");
const admin_module_1 = require("./modules/AdminModule/admin.module");
const dbmodule_module_1 = require("./persistance/dbmodule.module");
const user_module_1 = require("./modules/UserModule/user.module");
const product_module_1 = require("./modules/ProductModule/product.module");
const bucket_module_1 = require("./modules/BucketModule/bucket.module");
const order_module_1 = require("./modules/OrderModule/order.module");
const email_module_1 = require("./modules/EmailModule/email.module");
const currency_module_1 = require("./modules/Currencymodule/currency.module");
const slider_module_1 = require("./modules/SliderModule/slider.module");
const category_module_1 = require("./modules/CategoryModule/category.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const service_module_1 = require("./modules/ServiceModule/service.module");
const index_middleware_1 = require("./middlewares/index.middleware");
const routes_1 = require("./routes/routes");
const nest_router_1 = require("nest-router");
const color_module_1 = require("./modules/ColorModule/color.module");
const memory_module_1 = require("./modules/MemoryModule/memory.module");
const material_module_1 = require("./modules/MaterialModule/material.module");
const characteristic_module_1 = require("./modules/CharacteristicModule/characteristic.module");
const charactValue_module_1 = require("./modules/CharactValueModule/charactValue.module");
const section_module_1 = require("./modules/SectionModule/section.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(index_middleware_1.FrontendMiddleware).forRoutes({
            path: '/**',
            method: common_1.RequestMethod.ALL,
        });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.${process.env.NODE_ENV}.env`,
            }),
            serve_static_1.ServeStaticModule.forRoot((() => {
                const publicDir = (0, path_1.resolve)('./public');
                const servePath = '/files';
                return {
                    rootPath: publicDir,
                    serveRoot: servePath,
                    exclude: ['/api/'],
                };
            })()),
            nest_router_1.RouterModule.forRoutes(routes_1.routes),
            dbmodule_module_1.DbModule,
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
            user_module_1.UserModule,
            product_module_1.ProductModule,
            bucket_module_1.BucketModule,
            order_module_1.OrderModule,
            email_module_1.EmailModule,
            currency_module_1.CurrencyModule,
            slider_module_1.SliderModule,
            category_module_1.CategoryModule,
            service_module_1.ServiceModule,
            color_module_1.ColorModule,
            memory_module_1.MemoryModule,
            material_module_1.MaterialModule,
            characteristic_module_1.CharacteristicModule,
            charactValue_module_1.CharactValueModule,
            section_module_1.SectionModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map