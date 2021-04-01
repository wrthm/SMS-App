import { Joi } from 'express-validation'

const postModel = {
    body: Joi.object({
        code: Joi.string()
                 .trim()
                 .required(),
        name: Joi.string()
                 .trim()
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

export const SubjectValidator = { model, postModel }