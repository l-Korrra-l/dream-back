"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharactValueModule = void 0;
const common_1 = require("@nestjs/common");
const dbmodule_module_1 = require("../../persistance/dbmodule.module");
const charactValue_controller_1 = require("./charactValue.controller");
const charactValue_service_1 = require("./charactValue.service");
let CharactValueModule = class CharactValueModule {
};
CharactValueModule = __decorate([
    (0, common_1.Module)({
        imports: [dbmodule_module_1.DbModule],
        controllers: [charactValue_controller_1.CharactValueController],
        providers: [charactValue_service_1.CharactValueService],
    })
], CharactValueModule);
exports.CharactValueModule = CharactValueModule;
//# sourceMappingURL=charactValue.module.js.map