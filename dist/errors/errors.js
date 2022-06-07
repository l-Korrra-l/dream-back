"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationError = exports.LoginError = exports.RegisterError = exports.NotFound = void 0;
const common_1 = require("@nestjs/common");
class NotFound extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotFound = NotFound;
class RegisterError extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.RegisterError = RegisterError;
class LoginError extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.LoginError = LoginError;
class AuthorizationError extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.AuthorizationError = AuthorizationError;
//# sourceMappingURL=errors.js.map