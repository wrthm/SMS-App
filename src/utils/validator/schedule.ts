import { Joi } from 'express-validation'
import { CommonValidator } from './common'

const postModel = {
    body: Joi.object({
         professor_id: Joi.string()
                          .uuid()
                          .required(),
           subject_id: Joi.string()
                          .uuid()
                          .required(),
                 room: Joi.string()
                          .trim()
                          .max(30)
                          .required(),
                class: Joi.string()
                          .trim()
                          .max(30)
                          .required(),
             capacity: Joi.number()
                          .min(1)
                          .required(),
           time_start: Joi.string()
                          .required(),
        time_duration: Joi.string()
                          .max(20)
                          .required(),
                 days: Joi.array()
                          .items(
                              Joi.string().required()
                          )
                          .min(1)
                          .max(7)
                          .required()
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

const searchArgsModel = {
    query: CommonValidator.pagination.query.append({
         s_name: Joi.string(),
        p_fname: Joi.string(),
        p_mname: Joi.string(),
        p_lname: Joi.string(),
           room: Joi.string(),
          class: Joi.string(),
    })
}

export const ScheduleValidator = { model, postModel, searchArgsModel }