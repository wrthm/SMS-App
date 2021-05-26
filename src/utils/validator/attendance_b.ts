import { Joi } from "express-validation";

const scan = {
    body: Joi.object({
        i: Joi.string()
              .uuid()
              .required(),
        s: Joi.string()
              .required(),
        k: Joi.string()
              .required(),
    })
}

export const AttendanceBValidator = { scan }