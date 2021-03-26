import { Joi } from 'express-validation'

const postModel = {
    body: Joi.object({
            school_id: Joi.string()
                          .required(),
           first_name: Joi.string()
                          .required(),
          middle_name: Joi.string()
                          .required(),
            last_name: Joi.string()
                          .required(),
              address: Joi.string()
                          .required(),
                  sex: Joi.string()
                          .required(),
           birth_date: Joi.date()
                          .required(),
         phone_number: Joi.string()
                          // TODO: verify phone number using regex
                          // while we're at it, add unit test cases for the validators
                          .required(),
        email_address: Joi.string()
                          .email(),
             username: Joi.string(),
             password: Joi.string(),
    })
}

const model = {
    body: postModel.body.append({
                           id: Joi.string()
                                  .uuid()
                                  .required(),
        is_currently_enrolled: Joi.bool(),
    })
}

export const StudentValidator = { postModel, model }