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
                             .required(),
                 content: Joi.array()
                             .items(
                                 Joi.string().uuid().required(),
                             ),
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


export const CourseScheduleAndContentValidator = { postModel, model }