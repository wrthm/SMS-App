import { Joi } from 'express-validation'
import { CommonValidator } from './common'

const postModel = {
    body: Joi.object({
        department_id: Joi.string()
                          .uuid()
                          .required(),
                 name: Joi.string()
                          .trim()
                          .max(60)
                          .required(),
                 code: Joi.string()
                          .trim()
                          .max(30),
    })
}

const putModel = {
    body: Joi.object({
                   id: Joi.string()
                          .uuid()
                          .required(),
        department_id: Joi.string()
                          .uuid(),
                 name: Joi.string()
                          .trim()
                          .max(60),
                 code: Joi.string()
                          .trim()
                          .max(30),
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

const listAllModel = {
    query: CommonValidator.pagination.query.append({
        dept: Joi.string()
                 .uuid(),
    }),
}

export const CourseValidator = { postModel, putModel, model, listAllModel }