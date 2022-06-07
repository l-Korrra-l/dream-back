"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewFromUserSchema = void 0;
const Joi = require("joi");
exports.reviewFromUserSchema = Joi.object({
    text: Joi.string().min(3).max(250).required(),
    raiting: Joi.number().min(1).max(10).required(),
});
//# sourceMappingURL=reviewFromUser.schema.js.map