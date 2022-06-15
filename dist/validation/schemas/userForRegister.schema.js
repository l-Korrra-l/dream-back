"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userForRegisterSchema = void 0;
const Joi = require("joi");
exports.userForRegisterSchema = Joi.object({
    firstName: Joi.string().max(50).min(1),
    lastName: Joi.string().max(50).min(1),
    email: Joi.string().max(50).email().required(),
    birthDate: Joi.date().min('1900-01-01').max('2022-12-12'),
    password: Joi.string().min(3).max(30).required(),
    avatar: Joi.optional(),
});
//# sourceMappingURL=userForRegister.schema.js.map