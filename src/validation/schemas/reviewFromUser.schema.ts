import * as Joi from 'joi';

export const reviewFromUserSchema = Joi.object({
  text: Joi.string().min(3).max(250).required(),

  raiting: Joi.number().min(1).max(10).required(),
});
