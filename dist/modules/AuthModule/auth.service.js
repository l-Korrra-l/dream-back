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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_repository_1 = require("../../persistance/repository/user.repository");
const errors_1 = require("../../errors/errors");
const role_enum_1 = require("../../enums/role.enum");
const authtype_enum_1 = require("../../enums/authtype.enum");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(jwtService, userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    async registerUser(inputUser, authType) {
        let userForCreate;
        if (!(await this.userRepository.canRegister(inputUser.email))) {
            if (authType == authtype_enum_1.AuthType.Google) {
                return this.userRepository.findByEmail(inputUser.email);
            }
            throw new errors_1.RegisterError('user with this email already exist');
        }
        if (authType == authtype_enum_1.AuthType.Google) {
            userForCreate = Object.assign({ auth: authType, role: role_enum_1.Role.User }, inputUser);
        }
        if (authType == authtype_enum_1.AuthType.Basic) {
            const _a = inputUser, { password } = _a, defaultUser = __rest(_a, ["password"]);
            userForCreate = Object.assign({ auth: authType, role: role_enum_1.Role.User, password: await bcrypt.hash(password, 5) }, defaultUser);
        }
        const user = await this.userRepository.create(userForCreate);
        return user;
    }
    async login(userLogin) {
        const user = await this.userRepository.findByEmail(userLogin.email);
        if (user.auth === authtype_enum_1.AuthType.Google) {
            return user;
        }
        if (await bcrypt.compare(userLogin.password, user.password)) {
            return user;
        }
        throw new errors_1.AuthorizationError('wrong password');
    }
    async genToken(user) {
        const payload = { email: user.email, role: user.role, userId: user.userId };
        return {
            access_token: `Bearer ${this.jwtService.sign(payload)}`,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_repository_1.UserRepository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map