import { Joi } from 'express-validation'

const postModel = {
    body: Joi.object({
        course_schedule_id: Joi.string()
                               .uuid()
                               .required(),
               schedule_id: Joi.string()
                               .uuid()
                               .required(),
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

const cs_idModel = {
    params: Joi.object({
        cs_id: Joi.string()
                  .uuid()
                  .required(),
    })
}

const getProfessorIDModel = {
    params: Joi.object({
        professor_id: Joi.string()
                         .uuid()
                         .required(),
    })
}

const getProfessorAcademicTermIDsModel = {
    params: Joi.object({
            professor_id: Joi.string()
                             .uuid()
                             .required(),
        academic_term_id: Joi.string()
                             .uuid()
                             .required(),
    })
}

export const CourseScheduleContentValidator = { postModel, model, cs_idModel, getProfessorIDModel, getProfessorAcademicTermIDsModel }