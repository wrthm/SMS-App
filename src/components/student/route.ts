import { Router } from 'express'
import { validate } from 'express-validation'
import { StudentValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { StudentController as Controller} from './controller'

const StudentRouter : Router = Router()

StudentRouter.get('/student/:id', validate(CommonValidator.id), Controller.find)
             .get('/search/students/:name', Controller.find)
             .get('/search/students', validate(SchemaValidator.searchGranularModel), Controller.find)
             .get('/students', validate(CommonValidator.pagination), Controller.findAll)
             .post('/student', validate(SchemaValidator.postModel), Controller.add)
             .put('/student', validate(SchemaValidator.model), Controller.update)
             .delete('/student/:id', validate(CommonValidator.id), Controller.delete)

module.exports = StudentRouter