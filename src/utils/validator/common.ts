import { Joi } from 'express-validation'

const id = {
    params: Joi.object({
        id: Joi.string()
               .uuid()
               .required()
    })
}

const pagination = {
    query: Joi.object({
         page: Joi.number()
                  .integer()
                  .min(1)
                  .default(1)
                  .allow(null),
        limit: Joi.number()
                  .integer()
                  .min(25)
                  .max(250)
                  .default(50)
                  .allow(null),
    })
}

const searchGranularModel = {
    query: pagination.query.append({
        fname: Joi.string().allow(null, ''),
        mname: Joi.string().allow(null, ''),
        lname: Joi.string().allow(null, ''),
    }).min(1)
}

const loginModel = {
    body: Joi.object({
        username: Joi.string()
                     .required(),
        password: Joi.string()
                     .required(),
    })
}

export const CommonValidator = { id, pagination, searchGranularModel, loginModel }