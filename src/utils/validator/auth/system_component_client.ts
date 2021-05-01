import { Joi } from 'express-validation'

const postModel = {
    body: Joi.object({
        client_name: Joi.string()
                        .trim()
                        .max(60)
                        .required(),
          component: Joi.array()
                        .items(
                            Joi.string().required()
                        )
                        .min(1)
                        .max(8)
                        .required(),
    })
}

const deleteModel = {
    params: Joi.object({
        name: Joi.string()
                 .required()
    })
}

export const AuthComponentClientValidator = { postModel, deleteModel }