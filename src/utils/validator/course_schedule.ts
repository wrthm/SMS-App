import { Joi } from 'express-validation'

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


export const CourseScheduleValidator = { postModel, putModel, model }