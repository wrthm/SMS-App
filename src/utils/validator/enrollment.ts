import { Joi } from 'express-validation'

const postModel = {
    body: Joi.object({
        department_id: Joi.string()
                          .uuid()
                          .required(),
           student_id: Joi.string()
                          .uuid()
                          .required(),
            course_id: Joi.string()
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


export const EnrollmentValidator = { postModel, model }