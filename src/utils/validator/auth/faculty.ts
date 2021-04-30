import { Joi } from 'express-validation'
import { AuthStudentCredentialValidator as credRegex } from './student_credential'

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
                         .min(8)
                         .max(64)
                         .regex(credRegex.pwRegex)
                         .allow(null),
          privilege: Joi.array()
                        .items(
                            Joi.string().required()
                        )
                        .min(1)
                        .max(7)
                        .required()
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

export const AuthFacultyValidator = { model, postModel }