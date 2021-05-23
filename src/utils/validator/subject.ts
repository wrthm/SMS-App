import { Joi } from 'express-validation'
import { CommonValidator } from './common'

const postModel = {
    body: Joi.object({
        code: Joi.string()
                 .trim()
                 .max(60)
                 .required(),
        name: Joi.string()
                 .trim()
                 .max(60)
                 .required(),
    unit_lec: Joi.number()
                 .required(),
    unit_lab: Joi.number()
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

const subjPagination = {
    query: CommonValidator.pagination.query.append({
        code: Joi.string()
                 .allow(null),
    })
         
}

export const SubjectValidator = { model, postModel, subjPagination }