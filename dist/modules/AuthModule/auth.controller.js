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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const errors_1 = require("../../errors/errors");
const googleuser_dto_1 = require("./dto/googleuser.dto");
const userforregister_dto_1 = require("./dto/userforregister.dto");
const auth_service_1 = require("./auth.service");
const userlogin_dto_1 = require("./dto/userlogin.dto");
const currentuser_decorator_1 = require("../../decorators/currentuser.decorator");
const authtype_enum_1 = require("../../enums/authtype.enum");
const joivalidation_pipe_1 = require("../../validation/joivalidation.pipe");
const userForRegister_schema_1 = require("../../validation/schemas/userForRegister.schema");
const userLogin_schema_1 = require("../../validation/schemas/userLogin.schema");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async userRegistration(userForRegister) {
        const user = await this.authService.registerUser(userForRegister, authtype_enum_1.AuthType.Basic);
        const { password } = user, userForView = __rest(user, ["password"]);
        return userForView;
    }
    async userLogin(userLogin, res) {
        const user = await this.authService.login(userLogin);
        if (user.auth === authtype_enum_1.AuthType.Google) {
            (0, common_1.Redirect)('/auth/googlelogin', 301);
        }
        const token = await this.authService.genToken({
            email: user.email,
            role: user.role,
            userId: user.id,
        });
        const { password } = user, userForView = __rest(user, ["password"]);
        res.set('Authorization', token.access_token);
        res.json(userForView);
    }
    async googleAuth(req) { }
    async googleAuthRedirect(googleUser, res) {
        if (!googleUser) {
            throw new errors_1.AuthorizationError('Failed google authorization');
        }
        const user = await this.authService.registerUser(googleUser, authtype_enum_1.AuthType.Google);
        const token = await this.authService.genToken({
            email: googleUser.email,
            role: user.role,
            userId: user.id,
        });
        const { password } = user, userForView = __rest(user, ["password"]);
        res.set('Authorization', token.access_token);
        res.json({ user: userForView, token: token });
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)(new joivalidation_pipe_1.JoiValidationPipe(userForRegister_schema_1.userForRegisterSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userforregister_dto_1.UserForRegister]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userRegistration", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UsePipes)(new joivalidation_pipe_1.JoiValidationPipe(userLogin_schema_1.userLoginSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userlogin_dto_1.UserLogin, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLogin", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, currentuser_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [googleuser_dto_1.GoogleUser, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map