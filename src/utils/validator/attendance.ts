import { Joi } from 'express-validation'

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

const model = {
    body: postModel.body.append({
               id: Joi.string()
                      .uuid()
                      .required(),
    })
}


export const AttendanceValidator = { postModel, model }