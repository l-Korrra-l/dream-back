"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordForUpdateSchema = void 0;
const Joi = require("joi");
exports.recordForUpdateSchema = Joi.object({
    name: Joi.string().max(100).min(3).optional(),
    author: Joi.string().max(100).min(3).optional(),
    description: Joi.string().max(200).optional(),
    price: Joi.number().max(99999).min(1).optional(),
    newimage: Joi.optional(),
}).min(1);
//# sourceMappingURL=recordForUpdate.js.map