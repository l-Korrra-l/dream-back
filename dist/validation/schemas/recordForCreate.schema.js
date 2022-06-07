"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordForCreateSchema = void 0;
const Joi = require("joi");
exports.recordForCreateSchema = Joi.object({
    name: Joi.string().max(100).min(3).required(),
    author: Joi.string().max(100).min(3).required(),
    description: Joi.string().max(200).required(),
    price: Joi.number().max(99999).min(1).required(),
    image: Joi.optional(),
});
//# sourceMappingURL=recordForCreate.schema.js.map