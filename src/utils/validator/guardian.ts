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
                         .trim()
                         .min(11)
                         .max(13)
                         .regex(/^(\d{11}|\d{12}|\+\d{12})$/),
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