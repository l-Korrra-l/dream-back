"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userForUpdateSchema = void 0;
const Joi = require("joi");
exports.userForUpdateSchema = Joi.object({
    firstName: Joi.string().max(50).min(1).required(),
    lastName: Joi.string().max(50).min(1).required(),
    birthDate: Joi.string().required(),
    avatar: Joi.optional(),
});
//# sourceMappingURL=userForUpdate.schema.js.map