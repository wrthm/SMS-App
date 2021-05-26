import { Router } from 'express'
import { validate } from 'express-validation'
import { AttendanceBValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { AttendanceBController as Controller} from './controller'
import { authenticateComponentOnly } from '../../middleware/authenticate'

const AttendanceBRouter : Router = Router()

// AttendanceBRouter.get('/attendance_b/:id', validate(CommonValidator.id), Controller.find)
//                  .get('/attendances_b/:student_id', validate(SchemaValidator.listByStudentIDModel), Controller.find)
//                  .get('/attendances_b/:student_id/:academic_term_id', validate(SchemaValidator.listByStudentAcademicTermIDModel), Controller.find)
//                 //  .get('/attendances_b', validate(CommonValidator.pagination), Controller.findAll)
//                  .delete('/attendance_b/:id', validate(CommonValidator.id), Controller.delete)
AttendanceBRouter.post('/attendance_b/scan', authenticateComponentOnly, validate(SchemaValidator.scan), Controller.scan)

module.exports = AttendanceBRouter