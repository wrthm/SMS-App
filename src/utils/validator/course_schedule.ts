import { Joi } from 'express-validation'
import { CommonValidator } from './common'

const postModel = {
    body: Joi.object({
               course_id: Joi.string()
                             .uuid()
                             .required(),
        academic_term_id: Joi.string()
                            .uuid()
                            .required(),
                   name: Joi.string()
                            .trim()
                            .max(60)
                            .required(),
             year_level: Joi.string()
                            .trim()
                            .max(30)
                            .required(),
    })
}

const putModel = {
    body: Joi.object({
                id: Joi.string()
                       .uuid()
                       .required(),
              name: Joi.string()
                       .trim()
                       .required(),
        year_level: Joi.string()
                       .trim()
                       .max(30)
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

const searchArgsModel = {
    query: CommonValidator.pagination.query.append({
          name: Joi.string().allow(null, ''),
        c_name: Joi.string().allow(null, ''),
        a_name: Joi.string().allow(null, ''),
    })
}

const listAllModel = {
    query: CommonValidator.pagination.query.append({
        course: Joi.string().uuid(),
        term: Joi.string().uuid(),
    })
}

export const CourseScheduleValidator = { postModel, putModel, model, searchArgsModel, listAllModel }