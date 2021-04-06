import { Joi } from 'express-validation'
import { CommonValidator } from './common'

const postModel = {
    body: Joi.object({
               device_id: Joi.string()
                             .uuid()
                             .required(),
        academic_term_id: Joi.string()
                             .uuid()
                             .required(),
              student_id: Joi.string()
                             .uuid()
                             .required(),
                rfid_tag: Joi.string()
                             .uuid()
                             .required(),
              login_time: Joi.date()
                             .iso()
                             .required(),
             logout_time: Joi.date()
                             .iso(),
    })
}

const listByStudentIDModel = {
    params: Joi.object({
        student_id: Joi.string()
                       .uuid()
                       .required(),
    }),
    query: CommonValidator.pagination.query
}

const listByStudentAcademicTermIDModel = {
    params: Joi.object({
              student_id: Joi.string()
                             .uuid()
                             .required(),
        academic_term_id: Joi.string()
                             .uuid()
                             .required(),
    }),
    query: CommonValidator.pagination.query
}

const model = {
    body: postModel.body.append({
               id: Joi.string()
                      .uuid()
                      .required(),
    })
}


export const AttendanceValidator = { postModel, model, listByStudentIDModel, listByStudentAcademicTermIDModel }