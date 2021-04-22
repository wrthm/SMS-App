import { Joi } from 'express-validation'

const postModel = {
    body: Joi.object({
            student_id: Joi.string()
                           .uuid()
                           .required(),
            first_name: Joi.string()
                           .max(60)
                           .trim()
                           .allow(null),
           middle_name: Joi.string()
                           .max(60)
                           .trim()
                           .allow(null),
             last_name: Joi.string()
                           .max(60)
                           .trim()
                           .allow(null),
          phone_number: Joi.string()
                           .trim()
                           .min(11)
                           .max(13)
                           .regex(/^(\d{11}|\d{12}|\+\d{12})$/)
                           .allow(null),
               address: Joi.string()
                           .max(100)
                           .trim()
                           .allow(null),
          first_name_2: Joi.string()
                           .max(60)
                           .trim()
                           .allow(null),
         middle_name_2: Joi.string()
                           .max(60)
                           .trim()
                           .allow(null),
           last_name_2: Joi.string()
                           .max(60)
                           .trim()
                           .allow(null),
        phone_number_2: Joi.string()
                           .trim()
                           .min(11)
                           .max(13)
                           .regex(/^(\d{11}|\d{12}|\+\d{12})$/)
                           .allow(null),
             address_2: Joi.string()
                           .max(100)
                           .trim()
                           .allow(null),
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