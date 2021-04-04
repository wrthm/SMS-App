import { Joi } from 'express-validation'

const postModel = {
    body: Joi.object({
        department_id: Joi.string()
                          .uuid()
                          .required(),
           first_name: Joi.string()
                          .trim()
                          .required(),
          middle_name: Joi.string()
                          .trim()
                          .required(),
            last_name: Joi.string()
                          .trim()
                          .required(),
         phone_number: Joi.string()
                          .trim(),
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