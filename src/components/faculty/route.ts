import { Router } from 'express'
import { validate } from 'express-validation'
import { AuthFacultyValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { FacultyController as Controller} from './controller'

const FacultyRouter : Router = Router()

FacultyRouter.get('/faculty/:id', validate(CommonValidator.id), Controller.find)
             .get('/faculties', validate(CommonValidator.pagination), Controller.findAll)
             .post('/faculty', validate(SchemaValidator.postModel), Controller.add)
             .put('/faculty', validate(SchemaValidator.putModel), Controller.update)
             .delete('/faculty/:id', validate(CommonValidator.id), Controller.delete)

module.exports = FacultyRouter