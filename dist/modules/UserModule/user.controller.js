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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const currentuser_decorator_1 = require("../../decorators/currentuser.decorator");
const joivalidation_pipe_1 = require("../../validation/joivalidation.pipe");
const userForUpdate_schema_1 = require("../../validation/schemas/userForUpdate.schema");
const userforupdate_dto_1 = require("./dto/userforupdate.dto");
const user_service_1 = require("./user.service");
const multer_1 = require("multer");
const imageFilter_helpers_1 = require("../../helpers/imageFilter.helpers");
const uuid_1 = require("uuid");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUserProfile(user) {
        return await this.userService.getProfile(user.userId);
    }
    async updateuserProfile(currentUser, newUser, file) {
        newUser.img_path = 'http://194.62.19.52:7000/' + file.path.split('\\')[1];
        return await this.userService.updateProfile(currentUser.userId, newUser);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'получить данные авторизованного пользователя' }),
    __param(0, (0, currentuser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: 'public',
            filename: (req, file, cb) => {
                cb(null, `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: imageFilter_helpers_1.imageFileFilter,
    })),
    (0, swagger_1.ApiOperation)({ summary: 'изменить данные авторизованного пользователя' }),
    (0, common_1.Patch)(),
    __param(0, (0, currentuser_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)(new joivalidation_pipe_1.JoiValidationPipe(userForUpdate_schema_1.userForUpdateSchema))),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, userforupdate_dto_1.UserForUpdate, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateuserProfile", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map