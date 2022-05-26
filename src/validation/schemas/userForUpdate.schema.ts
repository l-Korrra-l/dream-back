import * as Joi from 'joi';

export const userForUpdateSchema = Joi.object({
  firstName: Joi.string().max(50).min(1).required(),

  lastName: Joi.string().max(50).min(1).required(),

  birthDate: Joi.string().required(),

  avatar: Joi.optional(),
});
