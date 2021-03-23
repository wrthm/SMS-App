import { Joi } from 'express-validation'

export const CourseValidator = {
    id: {
        params: Joi.object({
            id: Joi.string()
                   .uuid()
                   .required()
        })
    },
    model: {
        body: Joi.object({
            department_id: Joi.string()
                              .uuid()
                              .required(),
                     name: Joi.string()
                              .required(),
                is_hidden: Joi.bool()
        })
    }
}