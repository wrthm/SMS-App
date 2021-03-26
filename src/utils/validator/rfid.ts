import { Joi } from 'express-validation'

const postModel = {
    body: Joi.object({
        device_id: Joi.string()
                      .uuid()
                      .required(),
         rfid_tag: Joi.string()
                      .uuid()
                      .required(),
    })
}

export const RFIDValidator = { postModel }