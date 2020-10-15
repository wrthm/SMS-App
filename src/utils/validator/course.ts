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
            name: Joi.string()
            .required()
        })
    }
}