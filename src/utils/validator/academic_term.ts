import { Joi } from 'express-validation'

const postModel = {
    body: Joi.object({
        name: Joi.string()
                 .required(),
    })
}

const model = {
    body: postModel.body.append({
               id: Joi.string()
                      .uuid()
                      .required(),
        is_hidden: Joi.bool(),
    })
}

export const AcademicTermValidator = { postModel, model }