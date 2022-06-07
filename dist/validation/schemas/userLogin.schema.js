"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = void 0;
const Joi = require("joi");
exports.userLoginSchema = Joi.object({
    email: Joi.string()
        .email()
        .max(50)
        .required(),
    password: Joi.string()
        .min(3)
        .max(30)
});
//# sourceMappingURL=userLogin.schema.js.map