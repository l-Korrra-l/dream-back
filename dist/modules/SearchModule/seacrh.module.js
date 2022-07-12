"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModule = void 0;
const common_1 = require("@nestjs/common");
const dbmodule_module_1 = require("../../persistance/dbmodule.module");
const Search_controller_1 = require("./Search.controller");
const Search_service_1 = require("./Search.service");
let SearchModule = class SearchModule {
};
SearchModule = __decorate([
    (0, common_1.Module)({
        imports: [dbmodule_module_1.DbModule],
        controllers: [Search_controller_1.SearchController],
        providers: [Search_service_1.SearchService],
    })
], SearchModule);
exports.SearchModule = SearchModule;
//# sourceMappingURL=seacrh.module.js.map