import { HttpException } from '@nestjs/common';
export declare class NotFound extends HttpException {
    constructor(message: string);
}
export declare class RegisterError extends HttpException {
    constructor(message: string);
}
export declare class LoginError extends HttpException {
    constructor(message: string);
}
export declare class AuthorizationError extends HttpException {
    constructor(message: string);
}
