import { Joi } from 'express-validation'

const postModel = {
    body: Joi.object({
          academic_term_id: Joi.string()
                               .uuid()
                               .required(),
                student_id: Joi.string()
                               .uuid()
                               .required(),
        course_schedule_id: Joi.string()
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

const listByStudentIDModel = {
    params: Joi.object({
        student_id: Joi.string()
                       .uuid()
                       .required(),
    })
}

export const EnrollmentValidator = { postModel, model, listByStudentIDModel }