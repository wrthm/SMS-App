import { Router } from 'express'
import { validate } from 'express-validation'
import { AttendanceValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { AttendanceController as Controller} from './controller'

const AttendanceRouter : Router = Router()

AttendanceRouter.get('/attendance/:id', validate(CommonValidator.id), Controller.find)
                .get('/attendances/:student_id', validate(SchemaValidator.listByStudentIDModel), Controller.find)
                .get('/attendances/:student_id/:academic_term_id', validate(SchemaValidator.listByStudentAcademicTermIDModel), Controller.find)
                .get('/attendances', validate(CommonValidator.pagination), Controller.findAll)
                .delete('/attendance/:id', validate(CommonValidator.id), Controller.delete)

module.exports = AttendanceRouter