import { Router } from 'express'
import { validate } from 'express-validation'
import { CourseScheduleValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { CourseScheduleController as Controller} from './controller'

const CourseScheduleRouter : Router = Router()

CourseScheduleRouter.get('/course_schedule/:id', validate(CommonValidator.id), Controller.find)
                .get('/search/course_schedules', validate(SchemaValidator.searchArgsModel), Controller.search)
                .get('/course_schedules', validate(CommonValidator.pagination), Controller.findAll)
                .post('/course_schedule', validate(SchemaValidator.postModel), Controller.add)
                .put('/course_schedule', validate(SchemaValidator.model), Controller.update)
                .delete('/course_schedule/:id', validate(CommonValidator.id), Controller.delete)

module.exports = CourseScheduleRouter