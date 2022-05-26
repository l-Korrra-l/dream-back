import * as Joi from 'joi';

export const recordForUpdateSchema = Joi.object({
  name: Joi.string().max(100).min(3).optional(),

  author: Joi.string().max(100).min(3).optional(),

  description: Joi.string().max(200).optional(),

  price: Joi.number().max(99999).min(1).optional(),

  newimage: Joi.optional(),
}).min(1);