import { Joi } from 'express-validation'

const postModel = {
    body: Joi.object({
        department_id: Joi.string()
                          .uuid()
                          .required(),
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
         phone_number: Joi.string()
                          .trim()
                          .min(11)
                          .max(13)
                          .regex(/^(\d{11}|\d{12}|\+\d{12})$/),
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

export const ProfessorValidator = { model, postModel }