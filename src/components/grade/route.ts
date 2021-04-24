import { Router } from 'express'
import { validate } from 'express-validation'
import { GradeValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { GradeController as Controller} from './controller'

const GradeRouter : Router = Router()

GradeRouter.get('/grade/:enrollment_id/:subject_id', validate(SchemaValidator.getEnrollmentSubjectIDsModel), Controller.find)
           .get('/grades/:enrollment_id', validate(SchemaValidator.getEnrollmentIDModel), Controller.find)
           .get('/grades', validate(CommonValidator.pagination), Controller.findAll)
           .post('/grade', validate(SchemaValidator.postModel), Controller.updateOrAdd)
           // .put('/grade', validate(SchemaValidator.model), Controller.updateOrAdd)
           // .delete('/department/:id', validate(CommonValidator.id), Controller.delete)

module.exports = GradeRouter