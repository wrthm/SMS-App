import { Router } from 'express'
import { validate } from 'express-validation'
import { SubjectValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { SubjectController as Controller} from './controller'

const SubjectRouter : Router = Router()

SubjectRouter.get('/subject/:id', validate(CommonValidator.id), Controller.find)
                .get('/search/subjects/:name', validate(CommonValidator.pagination), Controller.find)
                .get('/subjects', validate(CommonValidator.pagination), Controller.findAll)
                .post('/subject', validate(SchemaValidator.postModel), Controller.add)
                .put('/subject', validate(SchemaValidator.model), Controller.update)
                .delete('/subject/:id', validate(CommonValidator.id), Controller.delete)

module.exports = SubjectRouter