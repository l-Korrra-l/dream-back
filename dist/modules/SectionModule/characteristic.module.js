"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicModule = void 0;
const common_1 = require("@nestjs/common");
const dbmodule_module_1 = require("../../persistance/dbmodule.module");
const characteristic_controller_1 = require("./characteristic.controller");
const characteristic_service_1 = require("./characteristic.service");
let CharacteristicModule = class CharacteristicModule {
};
CharacteristicModule = __decorate([
    (0, common_1.Module)({
        imports: [dbmodule_module_1.DbModule],
        controllers: [characteristic_controller_1.CharacteristicController],
        providers: [characteristic_service_1.CharacteristicService],
    })
], CharacteristicModule);
exports.CharacteristicModule = CharacteristicModule;
//# sourceMappingURL=characteristic.module.js.map