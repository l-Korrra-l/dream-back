import * as Joi from 'joi'


export const userLoginSchema = Joi.object({
    email:Joi.string()
    .email()
    .max(50)
    .required(),

    password: Joi.string()
    .min(3)
    .max(30)
})