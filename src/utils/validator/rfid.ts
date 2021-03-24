import { Joi } from 'express-validation'

export const RFIDValidator = {
    postModel: {
        body: Joi.object({
            device_id: Joi.string()
                          .uuid()
                          .required(),
             rfid_tag: Joi.string()
                          .uuid()
                          .required(),
        })
    }
}