import { Router } from 'express'
import { validate } from 'express-validation'
import { GuardianValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { GuardianController as Controller} from './controller'

const GuardianRouter : Router = Router()

GuardianRouter.get('/guardian/:student_id', validate(SchemaValidator.getStudentIDModel), Controller.find)
              .get('/search/guardians/:name', validate(CommonValidator.pagination), Controller.find)
              .get('/search/guardians', validate(CommonValidator.searchGranularModel), Controller.find)
              .get('/guardians', validate(CommonValidator.pagination), Controller.findAll)
              .put('/guardian', validate(SchemaValidator.model), Controller.update)

module.exports = GuardianRouter