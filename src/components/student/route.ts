import { Router } from 'express'
import { validate } from 'express-validation'
import { StudentValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { StudentController as Controller} from './controller'

const StudentRouter : Router = Router()

StudentRouter.get('/student/:id', validate(CommonValidator.id), Controller.find)
             .get('/student/:id/username', validate(CommonValidator.id), Controller.getUsername)
             .get('/student/:id/has_enrollments', validate(CommonValidator.id), Controller.hasEnrollments)
             .get('/search/students/:name', validate(CommonValidator.pagination), Controller.find)
             .get('/search/students', validate(CommonValidator.searchGranularModel), Controller.find)
             .get('/students', validate(CommonValidator.pagination), Controller.findAll)
             .post('/student', validate(SchemaValidator.postModel), Controller.add)
             .put('/student', validate(SchemaValidator.model), Controller.update)
             .delete('/student/:id', validate(CommonValidator.id), Controller.delete)

module.exports = StudentRouter