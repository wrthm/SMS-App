import { Router } from 'express'
import { validate } from 'express-validation'
import { AcademicTermValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { AcademicTermController as Controller} from './controller'

const AcademicTermRouter : Router = Router()

AcademicTermRouter.get('/academic_term/:id', validate(CommonValidator.id), Controller.find)
                  .get('/search/academic_terms/:name', Controller.find)
                  .get('/academic_terms', validate(CommonValidator.pagination), Controller.findAll)
                  .post('/academic_term', validate(SchemaValidator.postModel), Controller.add)
                  .put('/academic_term', validate(SchemaValidator.model), Controller.update)
                  .delete('/academic_term/:id', validate(CommonValidator.id), Controller.delete)

module.exports = AcademicTermRouter