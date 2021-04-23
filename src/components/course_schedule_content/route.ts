import { Router } from 'express'
import { validate } from 'express-validation'
import { CourseScheduleContentValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { CourseScheduleContentController as Controller} from './controller'

const CourseScheduleContentRouter : Router = Router()

CourseScheduleContentRouter.get('/course_schedule_content/:id', validate(CommonValidator.id), Controller.find)
                           .get('/course_schedule_contents/:cs_id', validate(SchemaValidator.cs_idModel), Controller.listByCourseSchedule)
                           .post('/course_schedule_content', validate(SchemaValidator.postModel), Controller.add)
                           .delete('/course_schedule_content/:id', validate(CommonValidator.id), Controller.delete)
                         //.get('/professor/:professor_id/schedules', validate(SchemaValidator.getProfessorIDModel), Controller.listByProf)
                           .get('/professor/:professor_id/schedules/:academic_term_id', validate(SchemaValidator.getProfessorAcademicTermIDsModel), Controller.listByProfAndAT)

module.exports = CourseScheduleContentRouter