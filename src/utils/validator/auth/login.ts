import { Joi } from 'express-validation'

const unRegex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,30}[a-zA-Z0-9]$/
const pwRegex = /^((?=.*[0-9])|(?=.*[!@#&()–_\[{}\]:;',?/*`~$^+=<>]))(?=.*[a-z])(?=.*[A-Z]).{6,64}$/

const putModel = {
    body: Joi.object({
        student_id: Joi.string()
                       .uuid()
                       .required(),
          username: Joi.string()
                       .min(5)
                       .max(32)
                       .regex(unRegex)
                       .allow(null),
          password: Joi.string()
                       .min(6)
                       .max(64)
                       .regex(pwRegex)
                       .allow(null),
    })
}

const loginModel = {
    body: Joi.object({
        username: Joi.string()
                     .required(),
        password: Joi.string()
                     .required(),
    })
}

export const AuthLoginValidator = { putModel, unRegex, pwRegex, loginModel }