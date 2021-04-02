import { Router } from 'express'
import { validate } from 'express-validation'
import { EnrollmentValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { EnrollmentController as Controller} from './controller'

const EnrollmentRouter : Router = Router()

EnrollmentRouter.get('/enrollment/:id', validate(CommonValidator.id), Controller.find)
                .get('/enrollments/:student_id', validate(SchemaValidator.listByStudentIDModel), Controller.listByStudentID)
                .get('/enrollments', validate(CommonValidator.pagination), Controller.findAll)
                .post('/enrollment', validate(SchemaValidator.postModel), Controller.add)
                .delete('/enrollment/:id', validate(CommonValidator.id), Controller.delete)

module.exports = EnrollmentRouter