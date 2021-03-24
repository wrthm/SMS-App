import { Joi } from 'express-validation'

export const DepartmentValidator = {
    model: {
        body: Joi.object({
                   id: Joi.string()
                          .uuid()
                          .required(),
                 name: Joi.string()
                          .required(),
            is_hidden: Joi.bool(),
        })
    },
    postModel: {
        body: Joi.object({
            name: Joi.string()
                     .required(),
        })
    },
}