import { Joi } from 'express-validation'
import { AuthLoginValidator as credRegex } from './login'

const postModel = {
    body: Joi.object({
          first_name: Joi.string()
                         .trim()
                         .max(60)
                         .required(),
         middle_name: Joi.string()
                         .trim()
                         .max(60),
           last_name: Joi.string()
                         .trim()
                         .max(60)
                         .required(),
             address: Joi.string()
                         .trim()
                         .max(100),
        phone_number: Joi.string()
                         .trim()
                         .min(11)
                         .max(13)
                         .regex(/^(\d{11}|\d{12}|\+\d{12})$/)
                         .allow(null),
            username: Joi.string()
                         .min(5)
                         .max(32)
                         .regex(credRegex.unRegex)
                         .required(),
            password: Joi.string()
                         .min(6)
                         .max(64)
                         .regex(credRegex.pwRegex)
                         .required(),
          privilege: Joi.array()
                        .items(
                            Joi.string().required()
                        )
                        .min(1)
                        .max(7)
                        .required()
    })
}

const putModel = {
    body: Joi.object({
                    id: Joi.string()
                           .uuid()
                           .required(),
        is_deactivated: Joi.bool(),
            first_name: Joi.string()
                           .trim()
                           .max(60),
           middle_name: Joi.string()
                           .trim()
                           .max(60),
             last_name: Joi.string()
                           .trim()
                           .max(60),
               address: Joi.string()
                           .trim()
                           .max(100),
          phone_number: Joi.string()
                           .trim()
                           .min(11)
                           .max(13)
                           .regex(/^(\d{11}|\d{12}|\+\d{12})$/)
                           .allow(null),
              username: Joi.string()
                           .min(5)
                           .max(32)
                           .regex(credRegex.unRegex)
                           .allow(null),
              password: Joi.string()
                           .min(6)
                           .max(64)
                           .regex(credRegex.pwRegex)
                           .allow(null),
             privilege: Joi.array()
                           .items(
                              Joi.string().required()
                           )
                           .min(1)
                           .max(7),
    })
}

const model = {
    body: postModel.body.append({
                    id: Joi.string()
                           .uuid()
                           .required(),
        is_deactivated: Joi.bool(),
    })
}

export const AuthFacultyValidator = { model, postModel, putModel }