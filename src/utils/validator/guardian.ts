import { Joi } from 'express-validation'

const postModel = {
    body: Joi.object({
          student_id: Joi.string()
                         .uuid()
                         .required(),
          first_name: Joi.string()
                         .required(),
         middle_name: Joi.string()
                         .required(),
           last_name: Joi.string()
                         .required(),
        phone_number: Joi.string()
                         .required(),
    })
}

const model = {
    body: postModel.body.append({
        is_hidden: Joi.bool(),
    })
}

export const GuardianValidator = { model, postModel }