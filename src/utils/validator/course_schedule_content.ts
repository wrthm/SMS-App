import { Joi } from 'express-validation'

const postModel = {
    body: Joi.object({
        course_schedule_id: Joi.string()
                               .uuid()
                               .required(),
               schedule_id: Joi.string()
                               .uuid()
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


export const CourseScheduleContentValidator = { postModel, model }