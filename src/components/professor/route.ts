import { Router } from 'express'
import { validate } from 'express-validation'
import { ProfessorValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { ProfessorController as Controller} from './controller'

const ProfessorRouter : Router = Router()

ProfessorRouter.get('/professor/:id', validate(CommonValidator.id), Controller.find)
               .get('/search/professors/:name', validate(CommonValidator.pagination), Controller.find)
               .get('/search/professors', validate(CommonValidator.searchGranularModel), Controller.find)
               .get('/professors', validate(SchemaValidator.listAllModel), Controller.findAll)
               .post('/professor', validate(SchemaValidator.postModel), Controller.add)
               .put('/professor', validate(SchemaValidator.model), Controller.update)
               .delete('/professor/:id', validate(CommonValidator.id), Controller.delete)

module.exports = ProfessorRouter