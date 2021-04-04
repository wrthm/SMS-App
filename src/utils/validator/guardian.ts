import { Joi } from 'express-validation'

const postModel = {
    body: Joi.object({
          student_id: Joi.string()
                         .uuid()
                         .required(),
          first_name: Joi.string()
                         .trim(),
         middle_name: Joi.string()
                         .trim(),
           last_name: Joi.string()
                         .trim(),
        phone_number: Joi.string()
    })
}

const getStudentIDModel = {
    params: Joi.object({
        student_id: Joi.string()
                       .uuid()
                       .required()
    })
}

const model = {
    body: postModel.body.append({
    })
}

export const GuardianValidator = { model, postModel, getStudentIDModel }