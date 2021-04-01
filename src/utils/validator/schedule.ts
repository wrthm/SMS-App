import { Joi } from 'express-validation'

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
                          .required(),
                class: Joi.string()
                          .trim()
                          .required(),
             capacity: Joi.number()
                          .min(1)
                          .required(),
           time_start: Joi.date()
                          .iso()
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

export const ScheduleValidator = { model, postModel }