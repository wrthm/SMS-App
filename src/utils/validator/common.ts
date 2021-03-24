import { Joi } from 'express-validation'

export const CommonValidator = {
    id: {
        params: Joi.object({
            id: Joi.string()
                   .uuid()
                   .required()
        })
    },
    pagination: {
        query: Joi.object({
             page: Joi.number()
                      .integer()
                      .min(1)
                      .default(1),
            limit: Joi.number()
                      .integer()
                      .min(25)
                      .max(250)
                      .default(50),
        })
    },
}