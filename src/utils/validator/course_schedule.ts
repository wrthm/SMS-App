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
    })
}

const putModel = {
      id: Joi.string()
             .uuid()
             .required(),
    name: Joi.string()
             .trim()
             .required()
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
          name: Joi.string(),
        c_name: Joi.string(),
        a_name: Joi.string(),
    })
}

export const CourseScheduleValidator = { postModel, putModel, model, searchArgsModel }