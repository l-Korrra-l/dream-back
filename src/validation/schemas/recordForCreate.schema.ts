import * as Joi from 'joi';

export const recordForCreateSchema = Joi.object({
  name: Joi.string().max(100).min(3).required(),

  author: Joi.string().max(100).min(3).required(),

  description: Joi.string().max(200).required(),

  price: Joi.number().max(99999).min(1).required(),

  image: Joi.optional(),
});
