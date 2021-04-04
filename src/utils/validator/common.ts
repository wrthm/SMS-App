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
                  .default(1),
        limit: Joi.number()
                  .integer()
                  .min(25)
                  .max(250)
                  .default(50),
    })
}

const searchGranularModel = {
    query: pagination.query.append({
        fname: Joi.string(),
        mname: Joi.string(),
        lname: Joi.string(),
    }).min(1)
}

export const CommonValidator = { id, pagination, searchGranularModel }