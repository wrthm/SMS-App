import { Joi } from 'express-validation'

const unRegex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,30}[a-zA-Z0-9]$/
const pwRegex = /^((?=.*[0-9])|(?=.*[!@#&()–_\[{}\]:;',?/*`~$^+=<>]))(?=.*[a-z])(?=.*[A-Z]).{6,64}$/

const putStudentCredModel = {
    body: Joi.object({
        student_id: Joi.string()
                       .uuid()
                       .required(),
          username: Joi.string()
                       .min(5)
                       .max(32)
                       .regex(unRegex)
                       .allow(null)
                       .messages({
                            'string.pattern.base': 'Username did not meet the specified criteria',
                        }),
          password: Joi.string()
                       .min(6)
                       .max(64)
                       .regex(pwRegex)
                       .allow(null)
                       .messages({
                            'string.pattern.base': 'Password did not meet the specified criteria',
                        }),
    })
}

const putPasswordModel = {
    body: Joi.object({
        currentPassword: Joi.string()
                            .min(6)
                            .max(64)
                            .required(),
            newPassword: Joi.string()
                            .min(6)
                            .max(64)
                            .regex(pwRegex)
                            .required()
                            .messages({
                                'string.pattern.base': 'Password did not meet the specified criteria',
                            }),
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

export const AuthLoginValidator = { putStudentCredModel, putPasswordModel, unRegex, pwRegex, loginModel }