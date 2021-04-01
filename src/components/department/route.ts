import { Router } from 'express'
import { validate } from 'express-validation'
import { DepartmentValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { DepartmentController as Controller} from './controller'

const DepartmentRouter : Router = Router()

DepartmentRouter.get('/department/:id', validate(CommonValidator.id), Controller.find)
                .get('/search/departments/:name', validate(CommonValidator.pagination), Controller.find)
                .get('/departments', validate(CommonValidator.pagination), Controller.findAll)
                .post('/department', validate(SchemaValidator.postModel), Controller.add)
                .put('/department', validate(SchemaValidator.model), Controller.update)
                .delete('/department/:id', validate(CommonValidator.id), Controller.delete)

module.exports = DepartmentRouter