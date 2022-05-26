import * as Joi from 'joi';

export const userForRegisterSchema = Joi.object({
  firstName: Joi.string().max(50).min(1).required(),

  lastName: Joi.string().max(50).min(1).required(),

  email: Joi.string().max(50).email().required(),

  birthDate: 
  Joi.date()
  .min('1900-01-01')
  .max('2022-12-12')
  .required(),

  password: Joi.string().min(3).max(30).required(),

  avatar: Joi.optional(),
});
