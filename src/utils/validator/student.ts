import { Joi } from 'express-validation'
import { CommonValidator } from './common'

const postModel = {
    body: Joi.object({
            school_id: Joi.string()
                          .trim(),
           first_name: Joi.string()
                          .trim()
                          .required(),
          middle_name: Joi.string()
                          .trim()
                          .required(),
            last_name: Joi.string()
                          .trim()
                          .required(),
              address: Joi.string()
                          .trim()
                          .required(),
                  sex: Joi.string()
                          .trim()
                          .required(),
           birth_date: Joi.date()
                          .iso()
                          .required(),
         phone_number: Joi.string()
                          .min(11)
                          .max(13)
                          .regex(/^(\d{11}|\d{12}|\+\d{12})$/)
                          .required(),
        email_address: Joi.string()
                          .email(),
             username: Joi.string(),
             password: Joi.string(),
    })
}

const searchGranularModel = {
    query: CommonValidator.pagination.query.append({
        fname: Joi.string(),
        mname: Joi.string(),
        lname: Joi.string(),
    }).min(1)
}

const model = {
    body: postModel.body.append({
                           id: Joi.string()
                                  .uuid()
                                  .required(),
        is_currently_enrolled: Joi.bool(),
    })
}

export const StudentValidator = { postModel, model, searchGranularModel }