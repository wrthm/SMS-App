import { Joi } from 'express-validation'
import { CommonValidator } from './common'

const postModel = {
    body: Joi.object({
            school_id: Joi.string()
                          .trim()
                          .max(30)
                          .allow(null),
           first_name: Joi.string()
                          .trim()
                          .max(60)
                          .required(),
          middle_name: Joi.string()
                          .trim()
                          .max(60)
                          .required(),
            last_name: Joi.string()
                          .trim()
                          .max(60)
                          .required(),
              address: Joi.string()
                          .trim()
                          .max(80)
                          .required(),
                  sex: Joi.string()
                          .trim()
                          .max(20)
                          .required(),
           birth_date: Joi.date()
                          .iso()
                          .required(),
         phone_number: Joi.string()
                          .trim()
                          .min(11)
                          .max(13)
                          .regex(/^(\d{11}|\d{12}|\+\d{12})$/)
                          .allow(null),
        email_address: Joi.string()
                          .trim()
                          .max(60)
                          .email()
                          .allow(null),
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

export const StudentValidator = { postModel, model }