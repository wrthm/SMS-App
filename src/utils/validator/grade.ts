import { Joi } from 'express-validation'

const postModel = {
    body: Joi.object({
        enrollment_id: Joi.string()
                          .uuid()
                          .required(),
           subject_id: Joi.string()
                          .uuid()
                          .required(),
                grade: Joi.number()
                          .required(),
    })
}

const getEnrollmentSubjectIDsModel = {
    params: Joi.object({
        enrollment_id: Joi.string()
                          .uuid()
                          .required(),
           subject_id: Joi.string()
                          .uuid()
                          .required(),
    })
}

const getEnrollmentIDModel = {
    params: Joi.object({
        enrollment_id: Joi.string()
                          .uuid()
                          .required(),
    })
}

const model = {
    body: postModel.body.append({
        is_hidden: Joi.bool(),
    })
}

export const GradeValidator = { model, postModel, getEnrollmentSubjectIDsModel, getEnrollmentIDModel }